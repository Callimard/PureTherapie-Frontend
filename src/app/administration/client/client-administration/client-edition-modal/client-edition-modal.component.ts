import {Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientService} from "../../../../../services/person/client/client.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-client-edition-modal',
  templateUrl: './client-edition-modal.component.html',
  styleUrls: ['./client-edition-modal.component.css'],
  host: {'class': 'd-flex flex-fill'}
})
export class ClientEditionModalComponent implements OnInit {

  baseClient: ClientDTO = ClientDTO.default();
  updatedClient: ClientDTO = ClientDTO.default();

  constructor(private clientService: ClientService, public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  closeClientEditionModal() {
    this.bsModalRef?.hide();
  }

  updateChange(): void {
    this.clientService.updateClient(this.updatedClient).then(() => {
      this.modalService.show(SuccessModalComponent, {
        initialState: {
          title: "Mise à jour des données client réussie",
          text: "Les données du client on put être mise à jour"
        }
      });
    }).catch(() => {
      this.modalService.show(FailModalComponent, {
        initialState: {
          title: "Mise à jour des données client non effectuée",
          text: "La mise à jour des données client n'a pu être mise à jour"
        }
      })
    })
  }

}
