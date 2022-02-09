import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BundlePurchaseDTO} from "../../../../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {DateTool} from "../../../../../../../tool/date-tool";
import {BillDTO} from "../../../../../../../services/product/bill/bill-dto";
import {BillTool} from "../../../../../../../tool/bill-tool";
import {ClientPaymentModalComponent} from "../../../client-payment-modal/client-payment-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  ClientBundlePurchaseEditionModalComponent
} from "../../../client-bundle-purchase-edition-modal/client-bundle-purchase-edition-modal.component";
import {ClientDTO} from "../../../../../../../services/person/client/client-dto";
import {BundleService} from "../../../../../../../services/product/aesthetic/bundle/bundle.service";

@Component({
  selector: 'app-client-packages',
  templateUrl: './client-packages.component.html',
  styleUrls: ['./client-packages.component.css'],
  host: {'class': 'client-packages'}
})
export class ClientPackagesComponent implements OnInit, OnChanges {

  @Input() client?: ClientDTO;

  clientBundlePurchases: BundlePurchaseDTO[] = [];

  constructor(private bundleService: BundleService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // This is normal
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recharge();
  }

  public recharge() {
    this.chargeClientBundlePurchases();
  }

  private chargeClientBundlePurchases() {
    if (this.client != null) {
      this.bundleService.getAllClientBundlePurchases(this.client.idPerson).then((res) => {
        this.clientBundlePurchases = res;
      }).catch(() => {
        console.error("Fail to charge all client bundle purchases");
      });
    }
  }

  extractOnlyDay(dateTime: string): string {
    return DateTool.extractOnlyDay(dateTime);
  }

  billIsTotallyPaid(bill: BillDTO): boolean {
    return BillTool.totallyPaid(bill);
  }

  billPartiallyPaid(bill: BillDTO): boolean {
    return BillTool.partiallyPaid(bill);
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
