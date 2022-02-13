import {Component, OnInit} from '@angular/core';
import {AppointmentDTO} from "../../../../services/appointment/appointment-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {AgendaComponent} from "../agenda.component";
import {ClientArrivalModalComponent} from "../client-arrival-modal/client-arrival-modal.component";
import {TerminateClientModalComponent} from "../terminate-client-modal/terminate-client-modal.component";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";

@Component({
  selector: 'app-appointment-summary-modal',
  templateUrl: './appointment-summary-modal.component.html',
  styleUrls: ['./appointment-summary-modal.component.css']
})
export class AppointmentSummaryModalComponent implements OnInit {

  agenda?: AgendaComponent;

  appointmentInfo: AppointmentDTO = AppointmentDTO.default();
  acStock: number = -1;

  cancelAppointmentConfirmationModal?: BsModalRef;
  clientArrivalModal?: BsModalRef;

  rechargeable?: { recharge(): () => void };

  constructor(private appointmentService: AppointmentService, private acService: AestheticCareService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // Normal
  }

  recharge() {
    this.chargeAppointmentInfo();
  }

  private chargeAppointmentInfo() {
    this.appointmentService.getAppointment(this.appointmentInfo.idAppointment).then((res) => {
      this.appointmentInfo = res;
      this.chargeACStock();
      this.rechargeable?.recharge();
    }).catch(() => {
      console.error("Cannot get appointment");
    })
  }

  private chargeACStock() {
    this.acService.getClientStockOfAC(this.appointmentInfo.client.idPerson, this.appointmentInfo.aestheticCare.idAestheticCare).then((res) => {
      this.acStock = res;
    }).catch(() => {
      console.error("Fail to charge client ac stock");
    })
  }

  close() {
    this.bsModalRef.hide();
  }

  demandCancelAppointment() {
    this.cancelAppointmentConfirmationModal = this.modalService.show(SimpleConfirmationModalComponent);
    this.cancelAppointmentConfirmationModal.content.title = "Confimer l'annulation du rendez vous";
    this.cancelAppointmentConfirmationModal.content.text = "Voulez-vous vraiment annuler le rendez-vous du client "
      + this.appointmentInfo.client.firstName + " " + this.appointmentInfo.client.lastName.toUpperCase()
      + " avec " + this.appointmentInfo.technician.firstName + " " + this.appointmentInfo.technician.lastName.toUpperCase()
      + " le " + this.appointmentInfo.day + " à " + this.appointmentInfo.time + " ?";
    this.cancelAppointmentConfirmationModal.content.confirmationFunction = () => this.cancelAppointment();
    this.cancelAppointmentConfirmationModal.content.parent = this.bsModalRef;
  }

  private cancelAppointment() {
    if (this.appointmentInfo !== undefined)
      this.appointmentService.cancelAppointment(this.appointmentInfo.idAppointment).then(() => {
        this.successCancelAppointment();
      }).catch(() => {
        this.failCancelAppointment();
      });
    else
      console.error("Cannot cancel appointment => appointmentInfo is undefinde");
  }

  private successCancelAppointment() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "L'annulation de rendez-vous réussie";
    successModal.content.text = "L'annulation du rendez-vous a été pris en compte.";
    this.agenda?.recharge();
    this.bsModalRef.hide();
  }

  private failCancelAppointment() {
    let successModal: BsModalRef = this.modalService.show(FailModalComponent);
    successModal.content.title = "L'annulation de rendez-vous n'a pas réussie";
    successModal.content.text = "L'annulation du rendez-vous n'a été pris en compte.";
  }

  clientArrive(appointment: AppointmentDTO) {
    this.clientArrivalModal = this.modalService.show(ClientArrivalModalComponent);
    this.clientArrivalModal.content.clientAppointment = appointment;
    this.clientArrivalModal.content.parent = this.bsModalRef;
    this.clientArrivalModal.content.agenda = this.agenda;
  }

  terminateClient() {
    let terminateClientModal: BsModalRef = this.modalService.show(TerminateClientModalComponent, {
      class: "big-modal"
    });
    terminateClientModal.content.parent = this.bsModalRef;
    if (this.appointmentInfo != null) {
      terminateClientModal.content.client = this.appointmentInfo.client;
      terminateClientModal.content.appointment = this.appointmentInfo;
      terminateClientModal.content.appointmentAC = this.appointmentInfo.aestheticCare;
      terminateClientModal.content.rechargeable = this;
      terminateClientModal.content.recharge();
    }
  }
}
