import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientDTO} from "../../../../../../../../services/person/client/client-dto";
import {SessionPurchaseDTO} from "../../../../../../../../services/product/aesthetic/care/dto/session-purchase-dto";
import {AestheticCareService} from "../../../../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BillDTO} from "../../../../../../../../services/product/bill/bill-dto";
import {BundlePurchaseDTO} from "../../../../../../../../services/product/aesthetic/bundle/dto/bundle-purchase-dto";
import {
  ClientBundlePurchaseComponent
} from "../client-packages/client-bundle-purchase/client-bundle-purchase.component";
import {ClientPaymentModalComponent} from "../../../../client-payment-modal/client-payment-modal.component";

@Component({
  selector: 'app-client-aesthetic-cares',
  templateUrl: './client-aesthetic-cares.component.html',
  styleUrls: ['./client-aesthetic-cares.component.css'],
  host: {'class': 'client-aesthetic-cares'}
})
export class ClientAestheticCaresComponent implements OnInit, OnChanges {

  @Input() client?: ClientDTO;

  clientSessionPurchases: SessionPurchaseDTO[] = [];

  constructor(private acService: AestheticCareService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.recharge();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recharge();
  }

  public recharge() {
    this.chargeClientSessionPurchases();
  }

  private chargeClientSessionPurchases() {
    if (this.client != null) {
      this.acService.getAllClientACPurchases(this.client.idPerson).then((res) => {
        this.clientSessionPurchases = res;
      }).catch(() => {
        console.error("Fail to charge all client ac purchases");
      });
    }
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

}
