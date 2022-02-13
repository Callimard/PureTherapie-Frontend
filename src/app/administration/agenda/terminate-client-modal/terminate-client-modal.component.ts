import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientDTO} from "../../../../services/person/client/client-dto";
import {BundlePurchaseDTO} from "../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {SessionPurchaseDTO} from "../../../../services/product/aesthetic/care/session-purchase-dto";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";
import {BundleService} from "../../../../services/product/aesthetic/bundle/bundle.service";
import {DateTool} from "../../../../tool/date-tool";
import {BillDTO} from "../../../../services/product/bill/bill-dto";
import {
  ClientBundlePurchaseEditionModalComponent
} from "../../client/client-administration/client-edition-modal/client-products/client-packages/client-bundle-purchase-edition-modal/client-bundle-purchase-edition-modal.component";
import {
  ClientPaymentModalComponent
} from "../../client/client-administration/client-payment-modal/client-payment-modal.component";
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/aesthetic-care-dto";
import {
  BundlePurchaseModalComponent
} from "../../product/product-purchase/bundle-purchase-modal/bundle-purchase-modal.component";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {AppointmentDTO} from "../../../../services/appointment/appointment-dto";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-terminate-client-modal',
  templateUrl: './terminate-client-modal.component.html',
  styleUrls: ['./terminate-client-modal.component.css']
})
export class TerminateClientModalComponent implements OnInit {

  client: ClientDTO = ClientDTO.default();
  appointment: AppointmentDTO = AppointmentDTO.default();
  appointmentAC: AestheticCareDTO = AestheticCareDTO.default();

  clientUnpaidBundlePurchases: BundlePurchaseDTO[] = [];
  clientUnpaidACPurchases: SessionPurchaseDTO[] = [];
  clientACStock: number = -1;

  rechargeable?: { recharge(): () => void };

  parent?: BsModalRef;

  constructor(private acService: AestheticCareService, private bundleService: BundleService,
              private appointmentService: AppointmentService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // Normal
  }

  recharge() {
    this.chargeAllUnpaidBundlePurchases();
    this.chargeAllUnpaidACPurchases();
    this.chargeACStock();
    this.rechargeable?.recharge();
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
    }).catch(() => {
      this.failFinalizeAppointment();
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

  private failFinalizeAppointment() {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Finalisation du client a échouée";
    failModal.content.text = "La finalisation du client n'a pas fonctionnée";
    this.rechargeable?.recharge();
    this.bsModalRef.hide();
  }

  extractOnlyDay(dateTime: string):
    string {
    return DateTool.extractOnlyDay(dateTime);
  }

  billIsTotallyPaid(bill: BillDTO) {
    let amountPaid = 0;
    for (let payment of bill.payments) {
      if (!payment.canceled)
        amountPaid += payment.amountPaid;
    }

    return amountPaid == bill.purchasePrice;
  }

  billPartiallyPaid(bill: BillDTO) {
    let amountPaid = 0;
    for (let payment of bill.payments) {
      if (!payment.canceled)
        amountPaid += payment.amountPaid;
    }

    return amountPaid > 0;
  }

  openBundlePurchaseEdition(bundlePurchase: BundlePurchaseDTO) {
    let bundlePurchaseEditionRef: BsModalRef = this.modalService.show(ClientBundlePurchaseEditionModalComponent, {
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

}
