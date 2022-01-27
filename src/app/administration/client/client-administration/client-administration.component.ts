import {Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../services/person/client/client-dto";
import {ClientService} from "../../../../services/person/client/client.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientEditionModalComponent} from "./client-edition-modal/client-edition-modal.component";
import {ClientRegistrationModalComponent} from "./client-registration-modal/client-registration-modal.component";
import {AuthenticationService} from "../../../../services/auth/authentication.service";

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

  clientEditionModal?: BsModalRef;
  clientRegistrationModal?: BsModalRef;

  constructor(private clientService: ClientService, private modalService: BsModalService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
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
    this.clientEditionModal = this.modalService.show(ClientEditionModalComponent, {class: 'big-modal d-flex'});
    this.clientEditionModal.content.baseClient = ClientDTO.removePhonePrefix(client);
    this.clientEditionModal.content.updatedClient = ClientDTO.removePhonePrefix(client);
    this.clientEditionModal.content.recharge();
  }

  registerClient() {
    this.clientEditionModal = this.modalService.show(ClientRegistrationModalComponent);
  }
}
