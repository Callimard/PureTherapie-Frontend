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
    let files: FileList | null = (<HTMLInputElement>event.target).files;

    if (files?.length == 1) {
      let file = files.item(0);
      if (file)
        this.uploadOneFile(file);

    } else if (files != null && files.length > 1) {
      this.uploadSeveralFiles(files);
    }
  }

  private uploadOneFile(file: File) {
    if (this.client != null) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('client_card', file);
      this.clientService.uploadClientCard(this.client.idPerson, formData)
        .then(() => {
          this.recharge();
        })
        .catch((err) => console.error("Client card upload fail, err = ", err));
    }
  }

  private uploadSeveralFiles(files: FileList) {
    if (this.client != null) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        if (file != null)
          formData.append('client_card', file);
      }

      this.clientService.uploadSeveralClientCard(this.client?.idPerson, formData)
        .then(() => {
          this.recharge();
        })
        .catch((err) => console.error("Client card upload fail, err = ", err));
    }
  }

  backendHost(): string {
    return GlobalVariables.BACK_END_URL;
  }

  deleteClientCard(cardPath: string) {
    if (this.client) {
      this.clientService.deleteClientCard(this.client?.idPerson, this.getCardFileName(cardPath))
        .then(() => this.recharge())
        .catch((err) => console.error("Client card delete fail, err = ", err));
    }
  }

  isImage(cardPath: string): boolean {
    let extension: string = this.getCardFileNameExtension(this.getCardFileName(cardPath));
    return extension === 'png' || extension === 'jpeg';
  }

  isPdf(cardPath: string): boolean {
    let extension: string = this.getCardFileNameExtension(this.getCardFileName(cardPath));
    return extension === 'pdf';
  }

  getCardFileName(cardPath: string): string {
    let split = cardPath.split("/");
    return split[split.length - 1];
  }

  getCardFileNameExtension(cardFileName: string): string {
    let split = cardFileName.split("\.");
    return split[split.length - 1];
  }
}
