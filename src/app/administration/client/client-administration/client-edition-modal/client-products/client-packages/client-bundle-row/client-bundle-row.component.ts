import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DateTool} from "../../../../../../../../tool/date-tool";
import {BundlePurchaseDTO} from "../../../../../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {BillDTO} from "../../../../../../../../services/product/bill/bill-dto";
import {BillTool} from "../../../../../../../../tool/bill-tool";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  ClientBundlePurchaseEditionModalComponent
} from "../client-bundle-purchase-edition-modal/client-bundle-purchase-edition-modal.component";
import {ClientPaymentModalComponent} from "../../../../client-payment-modal/client-payment-modal.component";
import {StockDTO} from "../../../../../../../../services/product/aesthetic/bundle/stock-dto";
import {BundleService} from "../../../../../../../../services/product/aesthetic/bundle/bundle.service";

@Component({
  selector: 'app-client-bundle-row',
  templateUrl: './client-bundle-row.component.html',
  styleUrls: ['./client-bundle-row.component.css'],
  host: {'class': 'client-bundle-row'}
})
export class ClientBundleRowComponent implements OnInit, OnChanges {

  @Input() bundlePurchase: BundlePurchaseDTO = BundlePurchaseDTO.default();

  stocks: StockDTO[] = [];

  constructor(private bundleService: BundleService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // Normal
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recharge()
  }

  recharge() {
    this.chargeAllBundlePurchaseStocks();
    this.chargeBundlePurchase();
  }

  private chargeAllBundlePurchaseStocks() {
    this.bundleService.getAllStocks(this.bundlePurchase.idBundlePurchase).then((res) => {
      this.stocks = res;
    }).catch(() => {
      console.error("Fail to charge all stocks of bundle purchase");
    })
  }

  private chargeBundlePurchase() {
    this.bundleService.getClientBundlePurchase(this.bundlePurchase.idBundlePurchase).then(res => {
      this.bundlePurchase = res;
    }).catch(() => {
      console.error("Fail to charge client bundle purchase");
    });
  }

  extractOnlyDay(dateTime: string): string {
    return DateTool.extractOnlyDay(dateTime);
  }

  remainingBalance(bill: BillDTO): number {
    return BillTool.remainingBalance(bill);
  }

  pay(bill: BillDTO) {
    let payBillRef: BsModalRef = this.modalService.show(ClientPaymentModalComponent, {
      class: 'medium-modal'
    });
    payBillRef.content.bill = bill;
    payBillRef.content.rechargeable = this;
  }


  openBundlePurchaseEdition(bundlePurchase: BundlePurchaseDTO) {
    let bundlePurchaseEditionRef: BsModalRef = this.modalService.show(ClientBundlePurchaseEditionModalComponent, {
      class: "medium-modal"
    });
    bundlePurchaseEditionRef.content.clientBundlePurchase = bundlePurchase;
    bundlePurchaseEditionRef.content.recharge();
  }

}
