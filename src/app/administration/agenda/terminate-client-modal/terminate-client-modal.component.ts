import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientDTO} from "../../../../services/person/client/client-dto";
import {BundlePurchaseDTO} from "../../../../services/product/aesthetic/bundle/dto/bundle-purchase-dto";
import {SessionPurchaseDTO} from "../../../../services/product/aesthetic/care/dto/session-purchase-dto";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";
import {BundleService} from "../../../../services/product/aesthetic/bundle/bundle.service";
import {DateTool} from "../../../../tool/date-tool";
import {BillDTO} from "../../../../services/product/bill/bill-dto";
import {
  ClientBundlePurchaseComponent
} from "../../client/client-administration/client-edition-modal/client-specific-information/client-products/client-packages/client-bundle-purchase/client-bundle-purchase.component";
import {
  ClientPaymentModalComponent,
  PaymentObserver
} from "../../client/client-administration/client-payment-modal/client-payment-modal.component";
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/dto/aesthetic-care-dto";
import {
  BundlePurchaseModalComponent
} from "../../product-purchase/bundle-purchase-modal/bundle-purchase-modal.component";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {AppointmentDTO} from "../../../../services/appointment/dto/appointment-dto";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {SimpleResponseDTO} from "../../../../services/util/simple-response-dto";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";
import {
  AppointmentCreationObserver,
  CreateAppointmentModalComponent
} from "../create-appointment-modal/create-appointment-modal.component";
import {BillService} from "../../../../services/product/bill/bill.service";
import {Rechargeable} from "../../../../tool/rechargeable";
import {PersonDTO} from "../../../../services/person/person-dto";
import {PersonTool} from "../../../../tool/person-tool";
import {ClientService} from "../../../../services/person/client/client.service";
import {ClientRemainingStockPayDTO} from "../../../../services/person/client/client-remaining-stock-pay-dto";

@Component({
  selector: 'app-terminate-client-modal',
  templateUrl: './terminate-client-modal.component.html',
  styleUrls: ['./terminate-client-modal.component.css']
})
export class TerminateClientModalComponent implements OnInit, AppointmentCreationObserver, PaymentObserver, Rechargeable {

  client: ClientDTO = ClientDTO.default();
  clientRemainingStock: ClientRemainingStockPayDTO = ClientRemainingStockPayDTO.default();
  appointment: AppointmentDTO = AppointmentDTO.default();
  appointmentAC: AestheticCareDTO = AestheticCareDTO.default();

  clientUnpaidBundlePurchases: BundlePurchaseDTO[] = [];
  clientUnpaidACPurchases: SessionPurchaseDTO[] = [];
  clientACStock: number = -1;

  technicianFreeTS: TimeSlotDTO[] = [];
  nextSelectedDay: string = TerminateClientModalComponent.getNextOneMonthDay();

  rechargeable?: { recharge(): () => void };

  parent?: BsModalRef;

  newAppointmentChosen: boolean = false;
  clientHasPaidToday: boolean = false;

  constructor(private acService: AestheticCareService, private bundleService: BundleService,
              private appointmentService: AppointmentService, private agendaService: AgendaService,
              private billService: BillService, private clientService: ClientService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeClientStockAndRemainingPayment();
  }

  private static getNextOneMonthDay(): string {
    let today = new Date();
    let oneMonthLater = new Date();
    oneMonthLater.setDate(today.getDate() + 30);
    return DateTool.toMySQLDateString(oneMonthLater);
  }

  nextOneMonthDay(): string {
    return TerminateClientModalComponent.getNextOneMonthDay()
  }

  recharge() {
    this.chargeAllUnpaidBundlePurchases();
    this.chargeAllUnpaidACPurchases();
    this.chargeACStock();
    this.chargeAllTimeSlots(this.appointment.technician.idPerson, this.nextSelectedDay);
    this.verifyClientHasPaidToday();
    this.chargeClientStockAndRemainingPayment();
    this.rechargeable?.recharge();
  }

  private chargeClientStockAndRemainingPayment() {
    this.clientService.getClientRemainingStockAndPay(this.client.idPerson).then((res) => {
      this.clientRemainingStock = res;
    });
  }

  private chargeACStock() {
    this.acService.getClientStockOfAC(this.client.idPerson, this.appointmentAC.idAestheticCare).then((res) => {
      this.clientACStock = res;
    }).catch(() => {
      console.error("Fail to charge client ac stock");
    })
  }

  private chargeAllUnpaidBundlePurchases() {
    this.bundleService.getAllUnpaidBundlePurchases(this.client.idPerson).then((res) => {
      this.clientUnpaidBundlePurchases = res;
    }).catch(() => {
      console.error("Fail to get all unpaid bundle purchases");
    });
  }

  private chargeAllUnpaidACPurchases() {
    this.acService.getAllUnpaidACPurchases(this.client.idPerson).then((res) => {
      this.clientUnpaidACPurchases = res;
    }).catch(() => {
      console.error("Fail to get all unpaid ac purchases");
    });
  }

  private chargeAllTimeSlots(idTechnician: number, day: string) {
    this.technicianFreeTS = [];
    this.agendaService.getAllTimeSlotsOfTechnician(idTechnician, day).then((res) => {
      for (let ts of res) {
        if (ts.free) {
          this.technicianFreeTS.push(ts);
        }
      }
    });
  }

  close() {
    this.bsModalRef.hide();
  }

  finalize() {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Finalisation du client";
    confirmationModal.content.text = "Vous êtes sur le point de finiliser le client, êtes-vous sûr?";
    confirmationModal.content.confirmationFunction = () => this.finalizeAppointment();
  }

  finalizeAppointment(): void {
    this.appointmentService.finalizeAppointment(this.appointment.idAppointment).then(() => {
      this.successFinalizeAppointment();
    }).catch((err) => {
      this.failFinalizeAppointment(err);
    });
  }

  private successFinalizeAppointment() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Finalisation du client réussie";
    successModal.content.text = "La finalisation du client a réussie";
    this.rechargeable?.recharge();
    this.bsModalRef.hide();
    this.parent?.hide();
  }

  private failFinalizeAppointment(err: SimpleResponseDTO) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Finalisation du client a échouée";
    failModal.content.text = "La finalisation du client n'a pas fonctionnée, Erreur : <strong>" + err.message + "</strong>";
    this.rechargeable?.recharge();
  }

  openBundlePurchaseEdition(bundlePurchase: BundlePurchaseDTO) {
    let bundlePurchaseEditionRef: BsModalRef = this.modalService.show(ClientBundlePurchaseComponent, {
      class: "medium-modal"
    });
    bundlePurchaseEditionRef.content.clientBundlePurchase = bundlePurchase;
    bundlePurchaseEditionRef.content.recharge();
  }

  pay(bill: BillDTO) {
    let payBillRef: BsModalRef = this.modalService.show(ClientPaymentModalComponent, {
      class: 'medium-modal'
    });
    payBillRef.content.bill = bill;
    payBillRef.content.rechargeable = this;
  }

  sellBundle() {
    let bundlePurchaseModal: BsModalRef = this.modalService.show(BundlePurchaseModalComponent, {
      class: 'big-modal'
    });
    bundlePurchaseModal.content.client = this.client;
    bundlePurchaseModal.content.rechargeable = this;
  }

  nextAppointmentDayChange(day: string): void {
    this.nextSelectedDay = day;
    this.chargeAllTimeSlots(this.appointment.technician.idPerson, this.nextSelectedDay);
  }

  takeNextAppointment(ts: TimeSlotDTO): void {
    let createAppointmentModal: BsModalRef = this.modalService.show(CreateAppointmentModalComponent, {
      class: 'medium-modal'
    });
    createAppointmentModal.content.idParamTechnician = this.appointment.technician.idPerson;
    createAppointmentModal.content.selectedDay = this.nextSelectedDay;
    createAppointmentModal.content.paramTime = ts.begin;
    createAppointmentModal.content.blocEdition = true;
    createAppointmentModal.content.displaySearchClient = false;
    createAppointmentModal.content.client = this.client;
    createAppointmentModal.content.creationAppointmentObserver = this;
    createAppointmentModal.content.agenda = this;
  }

  appointmentCreationSuccess(): void {
    this.newAppointmentChosen = true;
  }

  paymentSuccess(): void {
    this.clientHasPaidToday = true;
  }

  paymentSuccessOccurred(success: boolean) {
    this.verifyClientHasPaidToday();
  }

  verifyClientHasPaidToday(): void {
    this.billService.clientMakePaymentToday(this.client.idPerson).then((res) => {
      this.clientHasPaidToday = res;
    }).catch(() => {
      console.error("Fail to verify id client has paid today");
      this.clientHasPaidToday = false;
    });
  }

  chooseAppointmentLater(): void {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Ne pas prendre de rdv pour le prochain client";
    confirmationModal.content.text = "Êtes-vous sûr de ne pas prendre un prochain rendez-vous pour le client?";
    confirmationModal.content.confirmationFunction = () => this.newAppointmentChosen = true;
  }

  simplePersonIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

}
