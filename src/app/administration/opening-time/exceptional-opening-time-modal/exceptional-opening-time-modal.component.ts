import {Component, OnInit} from '@angular/core';
import {OpeningAndCloseService} from "../../../../services/agenda/opening-and-close.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {ExceptionalOpeningDTO} from "../../../../services/agenda/exceptional-opening-dto";
import {DateTool} from "../../../../tool/date-tool";

@Component({
  selector: 'app-exceptional-opening-time-modal',
  templateUrl: './exceptional-opening-time-modal.component.html',
  styleUrls: ['./exceptional-opening-time-modal.component.css']
})
export class ExceptionalOpeningTimeModalComponent implements OnInit {

  selectedDay: string = DateTool.toMySQLDateString(new Date());
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
    confirmationModal.content.title = "Ajout heure d'ouverture exceptionnelle";
    confirmationModal.content.text = "Êtes-vous sûr de vouloir ajouter de nouvelles heure exceptionnelles d'ouverture?";
    confirmationModal.content.parent = this.bsModalRef;
    confirmationModal.content.confirmationFunction = () => this.confirmAddExceptionalOpeningTime();
  }

  private confirmAddExceptionalOpeningTime() {
    let exceptionalOpeningTime = new ExceptionalOpeningDTO(0, this.selectedDay, this.selectedOpeningTime, this.selectedClosingTime);
    this.openingAndCloseService.addExceptionalOpeningTime(exceptionalOpeningTime).then(() => {
      this.successAddExceptionalOpeningTime();
    }).catch((err) => {
      this.failAddGlobalOpeningTime(err);
    })
  }

  private successAddExceptionalOpeningTime() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Ajout de nouvelles heures d'ouvertures exceptionnelle réussie";
    successModal.content.text = "L'ajout de nouvelles heures d'ouvertures exceptionnelle à réussie";
    this.rechargeable?.recharge();
  }

  private failAddGlobalOpeningTime(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Echec de l'ajout de nouvelles heures d'ouvertures exceptionnelle";
    failModal.content.text = "L'ajout de nouvelles heures d'ouvertures exceptionnelle à échoué. Err = " + err;
  }

}
