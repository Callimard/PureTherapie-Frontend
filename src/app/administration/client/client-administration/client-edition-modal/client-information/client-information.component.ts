import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientDTO} from "../../../../../../services/person/client/client-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../../util/modal/fail-modal/fail-modal.component";
import {ClientService} from "../../../../../../services/person/client/client.service";

@Component({
  selector: 'app-client-information',
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.css'],
  host: {'class': 'client-information'}
})
export class ClientInformationComponent implements OnInit {

  @Input() client: ClientDTO = ClientDTO.default();

  @Output() clientUpdateEvent = new EventEmitter<ClientDTO>();

  constructor(private clientService: ClientService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // This is normal
  }

  updateChange(): void {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Mise à jour client, confirmation"
    confirmationModal.content.text = "Êtes-vous sûr de vouloir mettre à jour les données client?"
    confirmationModal.content.confirmationFunction = () => this.updateClient();
  }

  private updateClient() {
    if (this.client != null) {
      this.clientService.updateClient(this.client).then((res) => {
        this.successUpdateClient(res);
      }).catch(() => {
        this.failUpdateClient();
      });
    }
  }

  private successUpdateClient(updatedClient: ClientDTO) {
    this.modalService.show(SuccessModalComponent, {
      initialState: {
        title: "Mise à jour des données client réussie",
        text: "Les données du client on put être mise à jour"
      }
    });
    this.clientUpdateEvent.emit(updatedClient);
  }

  private failUpdateClient() {
    this.modalService.show(FailModalComponent, {
      initialState: {
        title: "Mise à jour des données client non effectuée",
        text: "La mise à jour des données client n'a pu être mise à jour"
      }
    })
  }

  wrongPhoneNumber(): boolean {
    if (this.client != null) {
      return this.client.phone[1] === '0';
    } else
      return false;
  }

}
