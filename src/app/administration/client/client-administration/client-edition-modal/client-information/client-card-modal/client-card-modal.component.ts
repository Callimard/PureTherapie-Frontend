import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ClientDTO} from "../../../../../../../services/person/client/client-dto";
import {ClientService} from "../../../../../../../services/person/client/client.service";
import {Rechargeable} from "../../../../../../../tool/rechargeable";
import {GlobalVariables} from "../../../../../../../global/global-variables";

@Component({
  selector: 'app-client-card-modal',
  templateUrl: './client-card-modal.component.html',
  styleUrls: ['./client-card-modal.component.css']
})
export class ClientCardModalComponent implements OnInit, Rechargeable {

  client?: ClientDTO;
  fileName?: string;

  cardsImagePath: string[] = [];

  constructor(private clientService: ClientService, public bsRef: BsModalRef) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeCardsImagePath();
  }

  recharge(): void {
    this.chargeCardsImagePath();
  }

  private chargeCardsImagePath() {
    if (this.client)
      this.clientService.getClientCardsPath(this.client.idPerson).then(
        (res) => {
          this.cardsImagePath = res

        });
  }

  close() {
    this.bsRef.hide();
  }

  onFileSelected(event: Event) {
    let file = (<HTMLInputElement>event.target).files?.item(0);

    if (file && this.client) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('client_card', file);
      this.clientService.uploadsClientCard(this.client.idPerson, formData)
        .then(() => {
          this.recharge();
        })
        .catch((err) => console.error("Client card upload fail, err = ", err));
    }
  }

  backEndHost(): string {
    return GlobalVariables.BACK_END_URL;
  }

  deleteClientCard(cardPath: string) {
    if (this.client) {
      this.clientService.deleteClientCard(this.client?.idPerson, ClientCardModalComponent.getCardFileName(cardPath))
        .then(() => this.recharge())
        .catch((err) => console.error("Client card delete fail, err = ", err));
    }
  }

  public static getCardFileName(cardPath: string): string {
    let split = cardPath.split("\\");
    return split[split.length - 1];
  }
}
