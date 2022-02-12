import {Component, Input, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../../services/person/client/client-dto";

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css'],
  host: {'class': 'client-products'}
})
export class ClientProductsComponent implements OnInit {

  @Input() client?: ClientDTO;

  constructor() {
    // This is normal
  }

  ngOnInit(): void {
    // This is normal
  }
}
