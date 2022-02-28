import {Component, OnInit} from '@angular/core';
import {BundleDTO} from "../../../../services/product/aesthetic/bundle/dto/bundle-dto";
import {BundleService} from "../../../../services/product/aesthetic/bundle/bundle.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CreateUpdateBundleModalComponent} from "./create-update-bundle-modal/create-update-bundle-modal.component";
import {Rechargeable} from "../../../../tool/rechargeable";

@Component({
  selector: 'app-package-management',
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css'],
  host: {'class': 'package-management'}
})
export class PackageManagementComponent implements OnInit, Rechargeable {

  bundles: BundleDTO[] = [];

  constructor(private bundleService: BundleService, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeAllBundles();
  }

  recharge(): void {
    this.chargeAllBundles();
  }

  private chargeAllBundles() {
    this.bundleService.getAllBundles().then(res => this.bundles = res);
  }

  createPackage() {
    let modal: BsModalRef = this.modalService.show(CreateUpdateBundleModalComponent, {
      class: 'big-modal'
    });
    modal.content.rechargeable = this;
  }

}
