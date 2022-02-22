import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {GlobalOpeningTimeDTO} from "../../../services/agenda/global-opening-time-dto";
import {ExceptionalOpeningDTO} from "../../../services/agenda/exceptional-opening-dto";
import {ExceptionalCloseDTO} from "../../../services/agenda/exceptional-close-dto";
import {OpeningAndCloseService} from "../../../services/agenda/opening-and-close.service";
import {DateTool} from "../../../tool/date-tool";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {GlobalOpeningTimeModalComponent} from "./global-opening-time-modal/global-opening-time-modal.component";
import {
  ExceptionalOpeningTimeModalComponent
} from "./exceptional-opening-time-modal/exceptional-opening-time-modal.component";
import {ExceptionalCloseModalComponent} from "./exceptional-close-modal/exceptional-close-modal.component";
import {
  EditGlobalOpeningTimeModalComponent
} from "./edit-global-opening-time-modal/edit-global-opening-time-modal.component";
import {
  SimpleConfirmationModalComponent
} from "../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../util/modal/fail-modal/fail-modal.component";
import {
  EditExceptionalOpeningModalComponent
} from "./edit-exceptional-opening-modal/edit-exceptional-opening-modal.component";

@Component({
  selector: 'app-opening-time',
  templateUrl: './opening-time.component.html',
  styleUrls: ['./opening-time.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class OpeningTimeComponent implements OnInit {

  globalOpeningsTimes: GlobalOpeningTimeDTO[] = [];
  exceptionalOpenings: ExceptionalOpeningDTO[] = [];
  exceptionalClosings: ExceptionalCloseDTO[] = [];

  constructor(private openingAndCloseService: OpeningAndCloseService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
    this.recharge();
  }

  recharge() {
    this.chargeGlobalOpenings();
    this.chargeExceptionalOpening();
    this.chargeExceptionClosings();
  }

  private chargeGlobalOpenings() {
    this.openingAndCloseService.getAllGlobalOpeningTimes().then((res) => {
      this.globalOpeningsTimes = [...res].sort((got1, got2) => {
        return got1.day - got2.day;
      });
    }).catch(() => {
      console.error("Fail to charge global openings");
    });
  }

  private chargeExceptionalOpening() {
    this.openingAndCloseService.getAllExceptionalOpenings().then((res) => {
      this.exceptionalOpenings = res;
    }).catch(() => {
      console.error("Fail to charge exceptional openings");
    })
  }

  private chargeExceptionClosings() {
    this.openingAndCloseService.getAllExceptionalClosings().then((res) => {
      this.exceptionalClosings = res;
    }).catch(() => {
      console.error("Fail to charge exceptional closings");
    })
  }

  getDay(dayNumber: number): string {
    return DateTool.getDay(dayNumber);
  }

  addGlobalOpeningTime() {
    let bsRef: BsModalRef = this.modalService.show(GlobalOpeningTimeModalComponent);
    bsRef.content.rechargeable = this;
  }

  updateGlobalOpeningTime(globalOpening: GlobalOpeningTimeDTO) {
    let bsRef: BsModalRef = this.modalService.show(EditGlobalOpeningTimeModalComponent);
    bsRef.content.globalOpening = globalOpening;
    bsRef.content.rechargeable = this;
  }

  deleteGlobalOpeningTime(globalOpening: GlobalOpeningTimeDTO) {
    let bsRef: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    bsRef.content.title = "Suppression heure d'ouverture globale";
    bsRef.content.text = "Êtes-vous sûr de vouloir supprimer ces heure d'ouverture globales?";
    bsRef.content.confirmationFunction = () => {
      this.openingAndCloseService.deleteGlobalOpeningTime(globalOpening.idGlobalOpeningTime).then(() => {
        this.successDeleteGlobalOpening();
      }).catch(() => {
        this.failDeleteGlobalOpening();
      });
    }
  }

  private successDeleteGlobalOpening() {
    let bsRef: BsModalRef = this.modalService.show(SuccessModalComponent);
    bsRef.content.title = "Suppression réussie";
    bsRef.content.text = "Suppression des heures d'ouvertures globales réussie";
    this.recharge();
  }

  private failDeleteGlobalOpening() {
    let bsRef: BsModalRef = this.modalService.show(FailModalComponent);
    bsRef.content.title = "Suppression échouée";
    bsRef.content.text = "La suppression des heures d'ouvertures globales a échouée";
  }

  addExceptionalOpening() {
    let bsRef: BsModalRef = this.modalService.show(ExceptionalOpeningTimeModalComponent);
    bsRef.content.rechargeable = this;
  }

  updateExceptionalOpening(exceptionalOpening: ExceptionalOpeningDTO) {
    let bsRef: BsModalRef = this.modalService.show(EditExceptionalOpeningModalComponent);
    bsRef.content.exceptionalOpening = exceptionalOpening;
    bsRef.content.rechargeable = this;
  }

  deleteExceptionalOpeningTime(exceptionalOpening: ExceptionalOpeningDTO) {
    let bsRef: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    bsRef.content.title = "Suppression heure d'ouverture exceptionnelle";
    bsRef.content.text = "Êtes-vous sûr de vouloir supprimer ces heure d'ouverture exceptionnelle?";
    bsRef.content.confirmationFunction = () => {
      this.openingAndCloseService.deleteExceptionalOpeningTime(exceptionalOpening.idExceptionalOpening).then(() => {
        this.successDeleteExceptionalOpening();
      }).catch(() => {
        this.failDeleteExceptionalOpening();
      });
    }
  }

  private successDeleteExceptionalOpening() {
    let bsRef: BsModalRef = this.modalService.show(SuccessModalComponent);
    bsRef.content.title = "Suppression réussie";
    bsRef.content.text = "Suppression des heures d'ouvertures exceptionnelle réussie";
    this.recharge();
  }

  private failDeleteExceptionalOpening() {
    let bsRef: BsModalRef = this.modalService.show(FailModalComponent);
    bsRef.content.title = "Suppression échouée";
    bsRef.content.text = "La suppression des heures d'ouvertures exceptionnelle a échouée";
  }

  addExceptionalClose() {
    let bsRef: BsModalRef = this.modalService.show(ExceptionalCloseModalComponent);
    bsRef.content.rechargeable = this;
  }

  deleteExceptionalClose(exceptionalClose: ExceptionalCloseDTO) {
    let bsRef: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    bsRef.content.title = "Suppression de fermeture exceptionnelle";
    bsRef.content.text = "Êtes-vous sûr de vouloir supprimer cette fermeture exceptionnelle?";
    bsRef.content.confirmationFunction = () => {
      this.openingAndCloseService.deleteExceptionalClose(exceptionalClose.idExceptionalClose).then(() => {
        this.successDeleteExceptionalClose();
      }).catch(() => {
        this.failDeleteExceptionalClose();
      });
    }
  }

  private successDeleteExceptionalClose() {
    let bsRef: BsModalRef = this.modalService.show(SuccessModalComponent);
    bsRef.content.title = "Suppression réussie";
    bsRef.content.text = "Suppression de fermeture exceptionnelle réussie";
    this.recharge();
  }

  private failDeleteExceptionalClose() {
    let bsRef: BsModalRef = this.modalService.show(FailModalComponent);
    bsRef.content.title = "Suppression échouée";
    bsRef.content.text = "La suppression de fermeture exceptionnelle a échouée";
  }

}
