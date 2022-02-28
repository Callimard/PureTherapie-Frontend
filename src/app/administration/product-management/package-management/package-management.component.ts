import {Component, OnInit} from '@angular/core';
import {BundleDTO} from "../../../../services/product/aesthetic/bundle/bundle-dto";
import {BundleService} from "../../../../services/product/aesthetic/bundle/bundle.service";

@Component({
  selector: 'app-package-management',
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css'],
  host: {'class': 'package-management'}
})
export class PackageManagementComponent implements OnInit {

  bundles: BundleDTO[] = [];

  constructor(private bundleService: BundleService) {
    // Normal
  }

  ngOnInit(): void {
    this.bundleService.getAllBundles().then(res => this.bundles = res);
  }

}
