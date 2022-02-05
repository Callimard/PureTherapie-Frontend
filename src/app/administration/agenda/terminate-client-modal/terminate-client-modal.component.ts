import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientDTO} from "../../../../services/person/client/client-dto";
import {BundlePurchaseDTO} from "../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {SessionPurchaseDTO} from "../../../../services/product/aesthetic/care/session-purchase-dto";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";
import {BundleService} from "../../../../services/product/aesthetic/bundle/bundle.service";
import {DateTool} from "../../../../services/agenda/date-tool";
import {BillDTO} from "../../../../services/product/bill/bill-dto";
import {
  ClientBundlePurchaseEditionModalComponent
} from "../../client/client-administration/client-bundle-purchase-edition-modal/client-bundle-purchase-edition-modal.component";
import {
  ClientPaymentModalComponent
} from "../../client/client-administration/client-payment-modal/client-payment-modal.component";

@Component({
  selector: 'app-terminate-client-modal',
  templateUrl: './terminate-client-modal.component.html',
  styleUrls: ['./terminate-client-modal.component.css']
})
export class TerminateClientModalComponent implements OnInit {

  client: ClientDTO = ClientDTO.default();

  clientUnpaidBundlePurchases: BundlePurchaseDTO[] = [];
  clientUnpaidACPurchases: SessionPurchaseDTO[] = [];

  parent?: BsModalRef;

  constructor(private acService: AestheticCareService, private bundleService: BundleService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  recharge() {
    this.chargeAllUnpaidBundlePurchases();
    this.chargeAllUnpaidACPurchases();
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

}
