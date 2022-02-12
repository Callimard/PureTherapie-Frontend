import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleClientInfoDTO} from "../../../services/person/client/simple-client-info-dto";
import {ClientService} from "../../../services/person/client/client.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  ClientRegistrationModalComponent, ClientRegistrationObserver
} from "../../administration/client/client-administration/client-registration-modal/client-registration-modal.component";
import {ClientDTO} from "../../../services/person/client/client-dto";

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css'],
  host: {'class': 'client-search-component'}
})
export class SearchClientComponent implements OnInit, ClientRegistrationObserver {

  @Output() clientEvent = new EventEmitter<SimpleClientInfoDTO>();
  @Output() hasFoundClientEvent = new EventEmitter<boolean>();

  hasSearchClient = false;
  clientHasBeenFound = false;
  clientInfo?: SimpleClientInfoDTO;
  clientEmail: string = "";
  clientPhone: string = "";

  constructor(private clientService: ClientService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // Normal
  }

  async searchClient() {
    let client = null;
    try {
      if (this.clientEmail != null)
        client = await this.clientService.searchClientWithEmail(this.clientEmail);

      if (client == null)
        client = await this.clientService.searchClientWithPhone(this.clientPhone);

      if (client != null) {
        this.clientFound(client);
      } else {
        this.clientNotFound();
      }
    } catch (error) {
      this.clientNotFound();
    }
  }

  private clientFound(client: SimpleClientInfoDTO) {
    this.hasSearchClient = true;
    this.clientHasBeenFound = true;
    this.clientInfo = client;
    this.clientEvent.emit(this.clientInfo);
    this.hasFoundClientEvent.emit(this.clientHasBeenFound);
  }

  private clientNotFound() {
    this.hasSearchClient = true;
    this.clientHasBeenFound = false;
    this.clientInfo = undefined;
    this.clientEvent.emit(this.clientInfo);
    this.hasFoundClientEvent.emit(this.clientHasBeenFound);
  }

  clientHasBeenRegister(client?: ClientDTO): void {
    if (client != null) {
      this.clientFound(client);
    } else {
      this.clientNotFound();
    }
  }

  createClient() {
    let clientCreationModal: BsModalRef = this.modalService.show(ClientRegistrationModalComponent);
    clientCreationModal.content.clientRegister = this;
  }
}
