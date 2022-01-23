import {Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../services/person/client/client-dto";
import {ClientService} from "../../../../services/person/client/client.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientCardModalComponent} from "./client-card-modal/client-card-modal.component";

@Component({
  selector: 'app-client-administration',
  templateUrl: './client-administration.component.html',
  styleUrls: ['client-administration.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class ClientAdministrationComponent implements OnInit {

  foundClients: ClientDTO[] = [];

  selectedLastName?: string;
  selectedFirstName?: string;
  selectedEmail?: string;
  selectPhone?: string;
  selectAll: boolean = false;

  bsModalRef?: BsModalRef;

  constructor(private clientService: ClientService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  search() {
    this.foundClients = [];
    this.clientService.searchClientsWithFilter(this.selectAll, this.selectedLastName, this.selectedFirstName,
      this.selectedEmail, this.selectPhone).then((clients) => {
      this.foundClients = clients;
    }).catch((err) => {
      console.error("Fail to search client", err);
    });
  }

  cleanFilter() {
    this.foundClients = [];
    this.selectedLastName = '';
    this.selectedFirstName = '';
    this.selectedEmail = '';
    this.selectPhone = '';
    this.selectAll = false;
  }

  editClient(client: ClientDTO) {
    this.bsModalRef = this.modalService.show(ClientCardModalComponent, {class: 'big-modal d-flex'});
    this.bsModalRef.content.baseClient = ClientDTO.clone(client);
    this.bsModalRef.content.updatedClient = ClientDTO.clone(client);
  }
}
