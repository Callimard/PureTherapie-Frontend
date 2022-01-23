import {Component, OnInit} from '@angular/core';
import {BundleDTO} from "../../../../services/product/aesthetic/bundle/bundle-dto";
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/aesthetic-care-dto";

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class ProductPurchaseComponent implements OnInit {

  bundles: BundleDTO[] = [];
  aestheticCares: AestheticCareDTO[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.bundles.push(BundleDTO.default());
      this.aestheticCares.push(AestheticCareDTO.default());
    }
  }

  openTab(tabId: string) {
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

}
