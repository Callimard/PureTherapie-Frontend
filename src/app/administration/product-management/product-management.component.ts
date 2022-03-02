import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  host: {'class': 'product-management'}
})
export class ProductManagementComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
    // Normal
  }

  ngOnInit(): void {
    this.authService.checkLogin();
  }

}
