import {Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ClientService} from "../../../../../services/person/client/client.service";
import {AuthenticationService} from "../../../../../services/auth/authentication.service";
import {PersonTool} from "../../../../../tool/person-tool";

@Component({
  selector: 'app-client-edition-modal',
  templateUrl: './client-edition-modal.component.html',
  styleUrls: ['./client-edition-modal.component.css'],
  host: {'class': 'd-flex flex-fill'}
})
export class ClientEditionModalComponent implements OnInit {

  baseClient?: ClientDTO;
  updatedClient: ClientDTO = ClientDTO.default();

  defaultClient: ClientDTO = ClientDTO.default();

  clientToUpdateRef?: ClientDTO;

  constructor(private clientService: ClientService, private authenticationService: AuthenticationService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
  }

  formatSimpleClientIdentifier() {
    if (this.baseClient != null) {
      return PersonTool.formatPersonSimpleIdentifier(this.baseClient);
    } else
      return '';
  }

  closeClientEditionModal() {
    this.bsModalRef?.hide();
  }

  clientHasBeenUpdated(client: ClientDTO) {
    if (this.clientToUpdateRef != null)
      ClientDTO.updateFrom(this.clientToUpdateRef, client);
  }

}
