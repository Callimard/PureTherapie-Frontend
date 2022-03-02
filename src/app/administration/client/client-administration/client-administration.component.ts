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

  selectedPage: number = 1;

  foundClients: ClientDTO[] = [];

  selectedLastName?: string;
  selectedFirstName?: string;
  selectedEmail?: string;
  selectPhone?: string;

  constructor(private clientService: ClientService, private modalService: BsModalService,
              private authenticationService: AuthenticationService) {
    // Normal
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
    this.search();
  }

  updateFilter() {
    this.selectedPage = 1;
    this.search();
  }

  search() {
    this.foundClients = [];
    this.clientService.searchClientsWithFilter(this.selectedPage, this.selectedLastName, this.selectedFirstName,
      this.selectedEmail, this.selectPhone).then((clients) => {
      this.foundClients = clients;
    }).catch((err) => {
      console.error("Fail to search client", err);
    });
  }

  cleanFilter() {
    this.selectedLastName = '';
    this.selectedFirstName = '';
    this.selectedEmail = '';
    this.selectPhone = '';
    this.search();
  }

  editClient(client: ClientDTO) {
    let clientEditionModal: BsModalRef = this.modalService.show(ClientEditionModalComponent, {class: 'big-modal d-flex'});
    clientEditionModal.content.baseClient = ClientDTO.removePhonePrefix(client);
    clientEditionModal.content.baseClient.phone = clientEditionModal.content.baseClient.phone.replaceAll(" ", "");
    clientEditionModal.content.updatedClient = ClientDTO.removePhonePrefix(client);
    clientEditionModal.content.updatedClient.phone = clientEditionModal.content.updatedClient.phone.replaceAll(" ", "");
    clientEditionModal.content.clientToUpdateRef = client;
  }

  registerClient() {
    this.modalService.show(ClientRegistrationModalComponent);
  }

  changePage(add: number) {
    this.selectedPage += add;
    this.search();
  }
}
