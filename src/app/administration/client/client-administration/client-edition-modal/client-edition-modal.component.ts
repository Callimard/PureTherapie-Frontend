import {Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientService} from "../../../../../services/person/client/client.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {AuthenticationService} from "../../../../../services/auth/authentication.service";
import {BundlePurchaseDTO} from "../../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {SessionPurchaseDTO} from "../../../../../services/product/aesthetic/care/session-purchase-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {BundleService} from "../../../../../services/product/aesthetic/bundle/bundle.service";
import {DateTool} from "../../../../../tool/date-tool";
import {BillDTO} from "../../../../../services/product/bill/bill-dto";
import {
  ClientBundlePurchaseEditionModalComponent
} from "../client-bundle-purchase-edition-modal/client-bundle-purchase-edition-modal.component";
import {ClientPaymentModalComponent} from "../client-payment-modal/client-payment-modal.component";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";

@Component({
  selector: 'app-client-edition-modal',
  templateUrl: './client-edition-modal.component.html',
  styleUrls: ['./client-edition-modal.component.css'],
  host: {'class': 'd-flex flex-fill'}
})
export class ClientEditionModalComponent implements OnInit {

  baseClient: ClientDTO = ClientDTO.default();
  updatedClient: ClientDTO = ClientDTO.default();

  clientBundlePurchases: BundlePurchaseDTO[] = [];
  clientSessionPurchases: SessionPurchaseDTO[] = [];

  bundlePurchaseEditionRef?: BsModalRef;
  payBillRef?: BsModalRef;

  constructor(private clientService: ClientService, private authenticationService: AuthenticationService,
              private acService: AestheticCareService, private bundleService: BundleService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
  }

  recharge() {
    this.chargeClientBundlePurchases();
    this.chargeClientSessionPurchases();
  }

  private chargeClientBundlePurchases() {
    this.bundleService.getAllClientBundlePurchases(this.baseClient.idPerson).then((res) => {
      this.clientBundlePurchases = res;
    }).catch(() => {
      console.error("Fail to charge all client bundle purchases");
    })
  }

  private chargeClientSessionPurchases() {
    this.acService.getAllClientACPurchases(this.baseClient.idPerson).then((res) => {
      this.clientSessionPurchases = res;
    }).catch(() => {
      console.error("Fail to charge all client ac purchases");
    })
  }

  closeClientEditionModal() {
    this.bsModalRef?.hide();
  }

  updateChange(): void {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Mise à jour client, confirmation"
    confirmationModal.content.text = "Êtes-vous sûr de vouloir mettre à jour les données client?"
    confirmationModal.content.confirmationFunction = () => this.updateClient();
  }

  private updateClient() {
    this.clientService.updateClient(this.updatedClient).then(() => {
      this.successUpdateClient();
    }).catch(() => {
      this.failUpdateClient();
    });
  }

  private successUpdateClient() {
    this.modalService.show(SuccessModalComponent, {
      initialState: {
        title: "Mise à jour des données client réussie",
        text: "Les données du client on put être mise à jour"
      }
    });
  }

  private failUpdateClient() {
    this.modalService.show(FailModalComponent, {
      initialState: {
        title: "Mise à jour des données client non effectuée",
        text: "La mise à jour des données client n'a pu être mise à jour"
      }
    })
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
    this.bundlePurchaseEditionRef = this.modalService.show(ClientBundlePurchaseEditionModalComponent, {
      class: "medium-modal"
    });
    this.bundlePurchaseEditionRef.content.clientBundlePurchase = bundlePurchase;
    this.bundlePurchaseEditionRef.content.recharge();
  }

  pay(bill: BillDTO) {
    this.payBillRef = this.modalService.show(ClientPaymentModalComponent, {
      class: 'medium-modal'
    });
    this.payBillRef.content.bill = bill;
    this.payBillRef.content.rechargeable = this;
  }

}
