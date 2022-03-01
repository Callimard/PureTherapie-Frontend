import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BundleDTO} from "../../../../services/product/aesthetic/bundle/dto/bundle-dto";
import {BundleService} from "../../../../services/product/aesthetic/bundle/bundle.service";
import {ProductPurchaseModalComponent} from "../product-purchase-modal/product-purchase-modal.component";
import {ClientDTO} from "../../../../services/person/client/client-dto";

@Component({
  selector: 'app-bundle-purchase-modal',
  templateUrl: './bundle-purchase-modal.component.html',
  styleUrls: ['./bundle-purchase-modal.component.css']
})
export class BundlePurchaseModalComponent implements OnInit {

  parent?: BsModalService;

  client: ClientDTO = ClientDTO.default();
  bundles: BundleDTO[] = [];

  rechargeable?: { recharge(): () => void };

  constructor(private bundleService: BundleService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeBundles();
  }

  close() {
    this.bsModalRef.hide();
  }

  private chargeBundles() {
    this.bundleService.getAllBundles().then((res) => {
      this.bundles = res;
    }).catch(() => {
      console.error("Fail to charge all Bundles");
    });
  }

  purchaseBundle(bundle: BundleDTO) {
    let productPurchaseModalRef: BsModalRef = this.modalService.show(ProductPurchaseModalComponent, {
      class: "medium-modal"
    });
    productPurchaseModalRef.content.bundleToPurchase = bundle;
    productPurchaseModalRef.content.modePackage = true;
    productPurchaseModalRef.content.clientFound = this.client;
    productPurchaseModalRef.content.clientComplete = this.client;
    productPurchaseModalRef.content.hasSearchClient = true;
    productPurchaseModalRef.content.hasFoundClient = true;
    productPurchaseModalRef.content.displaySearchClient = false;
    productPurchaseModalRef.content.rechargeable = this.rechargeable;

  }

}
