import {Component, OnInit} from '@angular/core';
import {OpeningAndCloseService} from "../../../../services/agenda/opening-and-close.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {ExceptionalOpeningDTO} from "../../../../services/agenda/exceptional-opening-dto";
import {Rechargeable} from "../../../../tool/rechargeable";

@Component({
  selector: 'app-edit-exceptional-opening-modal',
  templateUrl: './edit-exceptional-opening-modal.component.html',
  styleUrls: ['./edit-exceptional-opening-modal.component.css']
})
export class EditExceptionalOpeningModalComponent implements OnInit {

  paramDay?: string;
  exceptionalOpening: ExceptionalOpeningDTO = ExceptionalOpeningDTO.default();

  rechargeable?: Rechargeable;

  constructor(private openingAndCloseService: OpeningAndCloseService, public bsModalRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    if (this.paramDay)
      this.exceptionalOpening.day = this.paramDay;
  }

  close() {
    this.bsModalRef.hide();
  }

  onSubmit() {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Mise à jour d'heure d'ouverture exceptionelle";
    confirmationModal.content.text = "Êtes-vous sûr de vouloir mettre à jour de nouvelles heure exceptionelles d'ouverture?";
    confirmationModal.content.parent = this.bsModalRef;
    confirmationModal.content.confirmationFunction = () => this.confirmUpdateExceptionalOpeningTime();
  }

  private confirmUpdateExceptionalOpeningTime() {
    this.openingAndCloseService.updateExceptionalOpeningTime(this.exceptionalOpening).then(() => {
      this.successUpdateExceptionalOpeningTime();
    }).catch((err) => {
      this.failUpdateExceptionalOpeningTime(err);
    })
  }

  private successUpdateExceptionalOpeningTime() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Ajout de nouvelles heures d'ouvertures exceptionelle réussie";
    successModal.content.text = "L'ajout de nouvelles heures d'ouvertures exceptionelle à réussie";
    this.rechargeable?.recharge();
  }

  private failUpdateExceptionalOpeningTime(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Echec de l'ajout de nouvelles heures d'ouvertures exceptionelle";
    failModal.content.text = "L'ajout de nouvelles heures d'ouvertures exceptionelle à échoué. Err = " + err;
  }
}
