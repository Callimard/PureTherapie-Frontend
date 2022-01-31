import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";
import {DateTool} from "../../../../services/agenda/date-tool";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CreateAppointmentModalComponent} from "./create-appointment-modal/create-appointment-modal.component";
import {AppointmentSummaryModalComponent} from "./appointment-summary-modal/appointment-summary-modal.component";
import {AppointmentDTO} from "../../../../services/appointment/appointment-dto";
import {AuthenticationService} from "../../../../services/auth/authentication.service";
import {
  ClientRegistrationModalComponent
} from "../../client/client-administration/client-registration-modal/client-registration-modal.component";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class AgendaComponent implements OnInit {

  technicians: TechnicianDTO[] = [];
  technicianTimeSlotMap: Map<number, TimeSlotDTO[]> = new Map<number, TimeSlotDTO[]>();

  today: string = DateTool.toMySQLDateString(new Date());

  createAppointmentModal?: BsModalRef;
  appointmentSummaryModal?: BsModalRef;
  registerClientModal?: BsModalRef;

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService,
              private authService: AuthenticationService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.recharge()
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.technicians = res;
      for (let tech of this.technicians)
        this.chargeAllTimeSlots(tech.idPerson);
    });
  }

  private chargeAllTimeSlots(idTechnician: number) {
    this.agendaService.getAllTimeSlotsOfTechnician(idTechnician, this.today).then((res) => {
      this.technicianTimeSlotMap.set(idTechnician, res);
    });
  }

  dayChange() {
    for (let tech of this.technicians)
      this.chargeAllTimeSlots(tech.idPerson);
  }

  createAppointment() {
    this.createAppointmentModal = this.modalService.show(CreateAppointmentModalComponent, {
      class: 'medium-modal'
    });
    this.createAppointmentModal.content.agenda = this;
  }

  clickOnFreeTS(proposedTechnician: TechnicianDTO, day: string, time: string) {
    this.createAppointmentModal = this.modalService.show(CreateAppointmentModalComponent);
    this.createAppointmentModal.content.idParamTechnician = proposedTechnician.idPerson;
    this.createAppointmentModal.content.selectedDay = day;
    this.createAppointmentModal.content.paramTime = time;
    this.createAppointmentModal.content.agenda = this;
  }

  clickOnOccupiedTS(appointment: AppointmentDTO) {
    this.appointmentSummaryModal = this.modalService.show(AppointmentSummaryModalComponent);
    this.appointmentSummaryModal.content.appointmentInfo = appointment;
    this.appointmentSummaryModal.content.agenda = this;
  }

  registerClient() {
    this.registerClientModal = this.modalService.show(ClientRegistrationModalComponent);
  }

  recharge() {
    this.chargeTechnician()
  }

  timeSlotPassed(timeSlot: TimeSlotDTO): boolean {
    let today = new Date(DateTool.toMySQLDateString(new Date()));
    let tsDate = new Date(timeSlot.day);
    if (today <= tsDate) {
      if (today.toISOString() === tsDate.toISOString()) {
        let now = new Date().getTime();
        let tsTime = new Date(timeSlot.day + ' ' + timeSlot.begin + ':00').getTime();
        return now > tsTime;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  extractClientIdentification(timeSlot: TimeSlotDTO): string {
    if (!timeSlot.free && timeSlot.appointment != null) {
      let firstName = timeSlot.appointment.client.firstName[0].toUpperCase() + timeSlot.appointment.client.firstName.slice(1);
      let lastName = timeSlot.appointment.client.lastName.toUpperCase();
      return firstName + " " + lastName;
    } else
      return "";
  }

}
