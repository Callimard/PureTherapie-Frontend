import {Component, OnInit} from '@angular/core';
import {BundleDTO} from "../../../services/product/aesthetic/bundle/bundle-dto";
import {AestheticCareDTO} from "../../../services/product/aesthetic/care/aesthetic-care-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ProductPurchaseModalComponent} from "./product-purchase-modal/product-purchase-modal.component";
import {AestheticCareService} from "../../../services/product/aesthetic/care/aesthetic-care.service";
import {BundleService} from "../../../services/product/aesthetic/bundle/bundle.service";
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class ProductPurchaseComponent implements OnInit {

  bundles: BundleDTO[] = [];
  aestheticCares: AestheticCareDTO[] = [];

  productPurchaseModalRef?: BsModalRef;

  constructor(private acService: AestheticCareService, private authenticationService: AuthenticationService,
              private bundleService: BundleService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
    this.chargeACs();
    this.chargeBundles();
  }

  private chargeACs() {
    this.acService.getAllAestheticCare().then((res) => {
      this.aestheticCares = res;
    }).catch(() => {
      console.error("Fail to charge all ACs");
    });
  }

  private chargeBundles() {
    this.bundleService.getAllBundles().then((res) => {
      this.bundles = res;
    }).catch(() => {
      console.error("Fail to charge all Bundles");
    });
  }

  changeTab(tabId: string) {
    let elem: HTMLCollectionOf<any> = document.getElementsByClassName('product-purchase-tab-content');
    for (let i = 0; i < elem.length; i++) {
      elem[i].style.display = "none";
    }
    let tab = document.getElementById(tabId);
    if (tab != null) {
      tab.style.display = "flex";
    } else {
      console.error("No tab with id" + tabId);
    }
  }

  purchaseBundle(bundle: BundleDTO) {
    this.productPurchaseModalRef = this.modalService.show(ProductPurchaseModalComponent, {
      initialState: {
        bundleToPurchase: bundle,
        modePackage: true
      },
      class: "medium-modal"
    })
  }

  purchaseAestheticCare(ac: AestheticCareDTO) {
    this.productPurchaseModalRef = this.modalService.show(ProductPurchaseModalComponent, {
      initialState: {
        acToPurchase: ac,
        modePackage: false
      },
      class: "medium-modal"
    })
  }

}
