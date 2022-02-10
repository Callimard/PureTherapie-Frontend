import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BundlePurchaseDTO} from "../../../../../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {StockDTO} from "../../../../../../../../services/product/aesthetic/bundle/stock-dto";
import {BundleService} from "../../../../../../../../services/product/aesthetic/bundle/bundle.service";
import {SimpleResponseDTO} from "../../../../../../../../services/util/simple-response-dto";
import {
  SimpleConfirmationModalComponent
} from "../../../../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";

@Component({
  selector: 'app-client-bundle-purchase-edition-modal',
  templateUrl: './client-bundle-purchase-edition-modal.component.html',
  styleUrls: ['./client-bundle-purchase-edition-modal.component.css']
})
export class ClientBundlePurchaseEditionModalComponent implements OnInit {

  clientBundlePurchase: BundlePurchaseDTO = BundlePurchaseDTO.default();
  bundlePurchaseStocks: StockDTO[] = [];

  constructor(private bundleService: BundleService, public bsModalRef: BsModalRef, public modalService: BsModalService) {
  }

  ngOnInit(): void {
    // Normal
  }

  close() {
    this.bsModalRef.hide();
  }

  recharge() {
    this.chargeAllBundlePurchaseStocks();
  }

  private chargeAllBundlePurchaseStocks() {
    this.bundleService.getAllStocks(this.clientBundlePurchase.idBundlePurchase).then((res) => {
      this.bundlePurchaseStocks = res;
    }).catch(() => {
      console.error("Fail to charge all stocks of bundle purchase");
    })
  }

  updateStocks() {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Confirmation mise à jour des stocks de packages de client"
    confirmationModal.content.text = "Êtes-vous sûr de vouloir mettre à jour les stocks des soins ésthétiques contenue " +
      "dans le package du client?";
    confirmationModal.content.confirmationFunction = () => this.updateClientBundleStock();
  }

  private updateClientBundleStock() {
    for (let stock of this.bundlePurchaseStocks) {
      this.bundleService.updateStock(stock).then((res) => {
        console.log("Update stock success, msg = ", res.message);
      }).catch((err: SimpleResponseDTO) => {
        console.error("Fail to update stock, msg = ", err.message);
      });
    }
  }
}
