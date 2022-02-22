import {Component, OnInit} from '@angular/core';
import {OpeningAndCloseService} from "../../../../services/agenda/opening-and-close.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {ExceptionalCloseDTO} from "../../../../services/agenda/exceptional-close-dto";

@Component({
  selector: 'app-exceptional-close-modal',
  templateUrl: './exceptional-close-modal.component.html',
  styleUrls: ['./exceptional-close-modal.component.css']
})
export class ExceptionalCloseModalComponent implements OnInit {

  selectedDay: string = "";

  rechargeable?: { recharge(): () => void };

  constructor(private openingAndCloseService: OpeningAndCloseService, public bsModalRef: BsModalRef,
              private modalService: BsModalService) {
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
    confirmationModal.content.title = "Ajout heure d'ouverture exceptionnelle";
    confirmationModal.content.text = "Êtes-vous sûr de vouloir ajouter de nouvelles heure exceptionnelles d'ouverture?";
    confirmationModal.content.parent = this.bsModalRef;
    confirmationModal.content.confirmationFunction = () => this.confirmAddExceptionalOpeningTime();
  }

  private confirmAddExceptionalOpeningTime() {
    let exceptionalOpeningTime = new ExceptionalCloseDTO(0, this.selectedDay);
    this.openingAndCloseService.addExceptionalClose(exceptionalOpeningTime).then(() => {
      this.successAddExceptionalOpeningTime();
    }).catch((err) => {
      this.failAddGlobalOpeningTime(err);
    })
  }

  private successAddExceptionalOpeningTime() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Ajout d'une fermeture exceptionnelle réussie";
    successModal.content.text = "L'ajout d'une fermeture exceptionnelle à réussie";
    this.rechargeable?.recharge();
  }

  private failAddGlobalOpeningTime(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Echec de l'ajout d'une fermeture exceptionnelle";
    failModal.content.text = "L'ajout d'une fermeture exceptionnelle à échoué. Err = " + err;
  }

}
