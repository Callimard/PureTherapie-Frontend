import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ClientDTO} from "../../../../../../services/person/client/client-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../../util/modal/fail-modal/fail-modal.component";
import {ClientService} from "../../../../../../services/person/client/client.service";
import {ClientAbsenceDelayDTO} from "../../../../../../services/person/client/client-absence-delay-dto";
import {ClientBasicAppointmentDTO} from "../../../../../../services/person/client/client-basic-appointment-dto";
import {ClientRemainingStockPayDTO} from "../../../../../../services/person/client/client-remaining-stock-pay-dto";

@Component({
  selector: 'app-client-information',
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.css'],
  host: {'class': 'client-information'}
})
export class ClientInformationComponent implements OnInit, OnChanges {

  @Input() client: ClientDTO = ClientDTO.default();

  @Output() clientUpdateEvent = new EventEmitter<ClientDTO>();

  clientAbsenceDelay: ClientAbsenceDelayDTO = ClientAbsenceDelayDTO.default();
  clientBasicAppointment: ClientBasicAppointmentDTO = ClientBasicAppointmentDTO.default();
  clientRemainingStock: ClientRemainingStockPayDTO = ClientRemainingStockPayDTO.default();

  constructor(private clientService: ClientService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // This is normal
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chargeClientAdditionalInfo();
  }

  private chargeClientAdditionalInfo() {
    if (this.client.idPerson > 0) {
      this.clientService.getClientAbsencesDelays(this.client.idPerson).then((res) => {
        this.clientAbsenceDelay = res;
      });
      this.clientService.getClientBasicAppointments(this.client.idPerson).then((res) => {
        if (res != null)
          this.clientBasicAppointment = res;
      });
      this.clientService.getClientRemainingStockAndPay(this.client.idPerson).then((res) => {
        this.clientRemainingStock = res;
      });
    }
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
