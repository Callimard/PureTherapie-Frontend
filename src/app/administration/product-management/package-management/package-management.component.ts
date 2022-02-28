import {Component, OnInit} from '@angular/core';
import {BundleDTO} from "../../../../services/product/aesthetic/bundle/bundle-dto";

@Component({
  selector: 'app-package-management',
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css'],
  host: {'class': 'package-management'}
})
export class PackageManagementComponent implements OnInit {

  bundles: BundleDTO[] = [];

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.bundles.push(BundleDTO.default());
    }
  }

}
