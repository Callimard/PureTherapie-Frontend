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
    let bsRef:BsModalRef = this.modalService.show(GlobalOpeningTimeModalComponent);
    bsRef.content.rechargeable = this;
  }

  addExceptionalOpening() {
    let bsRef:BsModalRef = this.modalService.show(ExceptionalOpeningTimeModalComponent);
    bsRef.content.rechargeable = this;
  }

  addExceptionalClose() {
    let bsRef:BsModalRef = this.modalService.show(ExceptionalCloseModalComponent);
    bsRef.content.rechargeable = this;
  }

}
