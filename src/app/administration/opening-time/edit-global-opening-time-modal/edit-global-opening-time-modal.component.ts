import {Component, OnInit} from '@angular/core';
import {OpeningAndCloseService} from "../../../../services/agenda/opening-and-close.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {GlobalOpeningTimeDTO} from "../../../../services/agenda/global-opening-time-dto";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-edit-global-opening-time-modal',
  templateUrl: './edit-global-opening-time-modal.component.html',
  styleUrls: ['./edit-global-opening-time-modal.component.css']
})
export class EditGlobalOpeningTimeModalComponent implements OnInit {

  globalOpening: GlobalOpeningTimeDTO = GlobalOpeningTimeDTO.default();

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
    confirmationModal.content.title = "Mise à jour d'heure d'ouverture globale";
    confirmationModal.content.text = "Êtes-vous sûr de vouloir mettre à jour de nouvelles heure globales d'ouverture?";
    confirmationModal.content.parent = this.bsModalRef;
    confirmationModal.content.confirmationFunction = () => this.confirmUpdateGlobalOpeningTime();
  }

  private confirmUpdateGlobalOpeningTime() {
    this.openingAndCloseService.updateGlobalOpeningTime(this.globalOpening).then(() => {
      this.successUpdateGlobalOpeningTime();
    }).catch((err) => {
      this.failUpdateGlobalOpeningTime(err);
    })
  }

  private successUpdateGlobalOpeningTime() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Ajout de nouvelles heures d'ouvertures réussie";
    successModal.content.text = "L'ajout de nouvelles heures d'ouvertures à réussie";
    this.rechargeable?.recharge();
  }

  private failUpdateGlobalOpeningTime(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Echec de l'ajout de nouvelles heures d'ouvertures";
    failModal.content.text = "L'ajout de nouvelles heures d'ouvertures à échoué. Err = " + err;
  }
}
