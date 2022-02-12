import {Component, Input, OnInit} from '@angular/core';
import {SessionPurchaseDTO} from "../../../../../../../../services/product/aesthetic/care/session-purchase-dto";
import {DateTool} from "../../../../../../../../tool/date-tool";
import {BillDTO} from "../../../../../../../../services/product/bill/bill-dto";
import {BillTool} from "../../../../../../../../tool/bill-tool";
import {BundlePurchaseDTO} from "../../../../../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  ClientBundlePurchaseEditionModalComponent
} from "../../client-packages/client-bundle-purchase-edition-modal/client-bundle-purchase-edition-modal.component";
import {ClientPaymentModalComponent} from "../../../../client-payment-modal/client-payment-modal.component";
import {AestheticCareService} from "../../../../../../../../services/product/aesthetic/care/aesthetic-care.service";

@Component({
  selector: 'app-client-aesthetic-care-row',
  templateUrl: './client-aesthetic-care-row.component.html',
  styleUrls: ['./client-aesthetic-care-row.component.css'],
  host: {'class': 'client-aesthetic-care-row'}
})
export class ClientAestheticCareRowComponent implements OnInit {

  @Input() sessionPurchase: SessionPurchaseDTO = SessionPurchaseDTO.default();

  constructor(private acService: AestheticCareService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // Normal
  }

  public recharge() {
    this.acService.getClientACPurchase(this.sessionPurchase.idSessionPurchase).then(res => {
        console.log("SP receive = ", res)
        this.sessionPurchase = res;
      }
    ).catch(() => {
      console.error("Fail to charge client session purchase")
    });
  }

  extractOnlyDay(dateTime: string): string {
    return DateTool.extractOnlyDay(dateTime);
  }

  remainingBalance(bill: BillDTO): number {
    return BillTool.remainingBalance(bill);
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
