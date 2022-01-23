import { Component, OnInit } from '@angular/core';
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-client-card-modal',
  templateUrl: './client-card-modal.component.html',
  styleUrls: ['./client-card-modal.component.css']
})
export class ClientCardModalComponent implements OnInit {

  client?: ClientDTO;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
