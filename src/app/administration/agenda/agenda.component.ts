import {Component, OnInit} from '@angular/core';
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {DateTool} from "../../../tool/date-tool";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CreateAppointmentModalComponent} from "./create-appointment-modal/create-appointment-modal.component";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {
  ClientRegistrationModalComponent
} from "../client/client-administration/client-registration-modal/client-registration-modal.component";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class AgendaComponent implements OnInit {

  today: string = DateTool.toMySQLDateString(new Date());

  createAppointmentModal?: BsModalRef;
  registerClientModal?: BsModalRef;

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService,
              private authService: AuthenticationService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.recharge();
  }

  recharge() {
    // Normal
  }

  createAppointment() {
    this.createAppointmentModal = this.modalService.show(CreateAppointmentModalComponent, {
      class: 'medium-modal'
    });
    this.createAppointmentModal.content.agenda = this;
  }

  registerClient() {
    this.registerClientModal = this.modalService.show(ClientRegistrationModalComponent);
  }

  dayChange(newDay: string) {
    this.today = newDay;
  }

}
