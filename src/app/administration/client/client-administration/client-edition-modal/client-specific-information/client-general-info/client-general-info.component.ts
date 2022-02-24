import {Component, Input, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../../../services/person/client/client-dto";

@Component({
  selector: 'app-client-general-info',
  templateUrl: './client-general-info.component.html',
  styleUrls: ['./client-general-info.component.css']
})
export class ClientGeneralInfoComponent implements OnInit {

  @Input() client?: ClientDTO;

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

}
