import {Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientService} from "../../../../../services/person/client/client.service";
import {SuccessModalComponent} from "../../../../Util/modal/success-modal/success-modal.component";

@Component({
  selector: 'app-client-card-modal',
  templateUrl: './client-card-modal.component.html',
  styleUrls: ['./client-card-modal.component.css'],
  host: {'class': 'd-flex flex-fill'}
})
export class ClientCardModalComponent implements OnInit {

  baseClient: ClientDTO = ClientDTO.default();
  updatedClient: ClientDTO = ClientDTO.default();

  constructor(private clientService: ClientService, public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  closeClientEditionModal() {
    this.bsModalRef.hide();
  }

  updateChange(): void {
    this.clientService.updateClient(this.updatedClient).then((res) => {
      this.modalService.show(SuccessModalComponent, {
        initialState: {
          title: "Mise à jour des données client réussie",
          text: "Les données du client on put être mise à jour"
        }
      });
    }).catch((error) => {
      console.log("Fail to update client data");
    })
  }

}
