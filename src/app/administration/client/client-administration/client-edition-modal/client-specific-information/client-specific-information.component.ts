import {Component, Input, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../../services/person/client/client-dto";

@Component({
  selector: 'app-client-specific-information',
  templateUrl: './client-specific-information.component.html',
  styleUrls: ['./client-specific-information.component.css'],
  host: {'class': 'client-specific-info'}
})
export class ClientSpecificInformationComponent implements OnInit {

  @Input() client?: ClientDTO;

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

}
