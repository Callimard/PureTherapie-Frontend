import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BundlePurchaseDTO} from "../../../../../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {ClientDTO} from "../../../../../../../../services/person/client/client-dto";
import {BundleService} from "../../../../../../../../services/product/aesthetic/bundle/bundle.service";

@Component({
  selector: 'app-client-packages',
  templateUrl: './client-packages.component.html',
  styleUrls: ['./client-packages.component.css'],
  host: {'class': 'client-packages'}
})
export class ClientPackagesComponent implements OnInit, OnChanges {

  @Input() client?: ClientDTO;

  clientBundlePurchases: BundlePurchaseDTO[] = [];

  constructor(private bundleService: BundleService) {
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

}
