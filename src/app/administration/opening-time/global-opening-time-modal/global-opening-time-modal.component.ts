import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {GlobalOpeningTimeDTO} from "../../../../services/agenda/global-opening-time-dto";
import {OpeningAndCloseService} from "../../../../services/agenda/opening-and-close.service";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";

@Component({
  selector: 'app-global-opening-time-modal',
  templateUrl: './global-opening-time-modal.component.html',
  styleUrls: ['./global-opening-time-modal.component.css']
})
export class GlobalOpeningTimeModalComponent implements OnInit {

  selectedDay: number = 1;
  selectedOpeningTime: string = "00:00";
  selectedClosingTime: string = "23:00";

  rechargeable?: { recharge(): () => void };

  constructor(private openingAndCloseService: OpeningAndCloseService, public bsModalRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  close() {
    this.bsModalRef.hide();
  }

  onSubmit() {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Ajout heure d'ouverture globale";
    confirmationModal.content.text = "Êtes-vous sûr de vouloir ajouter de nouvelles heure globales d'ouverture?";
    confirmationModal.content.parent = this.bsModalRef;
    confirmationModal.content.confirmationFunction = () => this.confirmAddGlobalOpeningTime();
  }

  private confirmAddGlobalOpeningTime() {
    let globalOpeningTime = new GlobalOpeningTimeDTO(0, this.selectedDay, this.selectedOpeningTime, this.selectedClosingTime);
    this.openingAndCloseService.addGlobalOpeningTime(globalOpeningTime).then(() => {
      this.successAddGlobalOpeningTime();
    }).catch((err) => {
      this.failAddGlobalOpeningTime(err);
    })
  }

  private successAddGlobalOpeningTime() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Ajout de nouvelles heures d'ouvertures réussie";
    successModal.content.text = "L'ajout de nouvelles heures d'ouvertures à réussie";
    this.rechargeable?.recharge();
  }

  private failAddGlobalOpeningTime(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Echec de l'ajout de nouvelles heures d'ouvertures";
    failModal.content.text = "L'ajout de nouvelles heures d'ouvertures à échoué. Err = " + err;
  }
}
