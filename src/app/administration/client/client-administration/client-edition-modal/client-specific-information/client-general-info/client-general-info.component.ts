import {Component, Input, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../../../services/person/client/client-dto";

@Component({
  selector: 'app-client-general-info',
  templateUrl: './client-general-info.component.html',
  styleUrls: ['./client-general-info.component.css'],
  host: {'class': 'client-general-info'}
})
export class ClientGeneralInfoComponent implements OnInit {

  @Input() client?: ClientDTO;

  selectedFilter: number = 0;
  private nbFilter: number = 4;

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
