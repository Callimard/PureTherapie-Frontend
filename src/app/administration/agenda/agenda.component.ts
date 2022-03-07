import {Component, OnInit, ViewChild} from '@angular/core';
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {DateTool} from "../../../tool/date-tool";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CreateAppointmentModalComponent} from "./create-appointment-modal/create-appointment-modal.component";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {
  ClientRegistrationModalComponent
} from "../client/client-administration/client-registration-modal/client-registration-modal.component";
import {Rechargeable} from "../../../tool/rechargeable";
import {AgendaPerTechnicianComponent} from "./agenda-per-technician/agenda-per-technician.component";
import {SurbookingModalComponent} from "./surbooking-modal/surbooking-modal.component";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class AgendaComponent implements OnInit, Rechargeable {

  @ViewChild(AgendaPerTechnicianComponent) aPerTech?: AgendaPerTechnicianComponent;

  today: string = DateTool.toMySQLDateString(new Date());

  createAppointmentModal?: BsModalRef;
  registerClientModal?: BsModalRef;

  agendaView: number = 1;

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService,
              private authService: AuthenticationService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.recharge();
  }

  recharge() {
    this.aPerTech?.recharge();
  }

  createAppointment() {
    this.createAppointmentModal = this.modalService.show(CreateAppointmentModalComponent, {
      class: 'medium-modal'
    });
    this.createAppointmentModal.content.rechargeable = this;
  }

  registerClient() {
    this.registerClientModal = this.modalService.show(ClientRegistrationModalComponent);
  }

  dayChange(newDay: string) {
    this.today = newDay;
  }

  surbooking() {
    this.modalService.show(SurbookingModalComponent, {
      initialState: {
        day: this.today
      },
      class: 'medium-modal'
    });
  }

}
