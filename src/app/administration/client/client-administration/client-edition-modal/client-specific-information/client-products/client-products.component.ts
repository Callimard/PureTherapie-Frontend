import {Component, Input, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../../../services/person/client/client-dto";

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css'],
  host: {'class': 'client-products'}
})
export class ClientProductsComponent implements OnInit {

  @Input() client?: ClientDTO;

  selectedFilter: number = 0;
  private nbFilter: number = 3;

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  choseFilter(filter: number) {
    this.selectedFilter = filter % this.nbFilter;
  }

}
