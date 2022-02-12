import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TechnicianDTO} from "../../../../services/person/technician/technician-dto";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";
import {DateTool} from "../../../../tool/date-tool";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {AuthenticationService} from "../../../../services/auth/authentication.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PersonTool} from "../../../../tool/person-tool";
import {PersonDTO} from "../../../../services/person/person-dto";
import {CreateAppointmentModalComponent} from "../create-appointment-modal/create-appointment-modal.component";
import {AppointmentDTO} from "../../../../services/appointment/appointment-dto";
import {AppointmentSummaryModalComponent} from "../appointment-summary-modal/appointment-summary-modal.component";

@Component({
  selector: 'app-agenda-per-technician',
  templateUrl: './agenda-per-technician.component.html',
  styleUrls: ['./agenda-per-technician.component.css'],
  host: {'class': 'agenda-per-technician'}
})
export class AgendaPerTechnicianComponent implements OnInit, OnChanges {

  allTechnicians: TechnicianDTO[] = [];
  technicianTimeSlotMap: Map<number, TimeSlotDTO[]> = new Map<number, TimeSlotDTO[]>();

  @Input() today: string = DateTool.toMySQLDateString(new Date());

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService,
              private authService: AuthenticationService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.recharge();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recharge();
  }

  public recharge() {
    this.chargeTechnician();
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
      for (let tech of this.allTechnicians)
        this.chargeAllTimeSlots(tech.idPerson);
    });
  }

  private chargeAllTimeSlots(idTechnician: number) {
    this.agendaService.getAllTimeSlotsOfTechnician(idTechnician, this.today).then((res) => {
      this.technicianTimeSlotMap.set(idTechnician, res);
    });
  }

  formatPersonSimpleIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

  clickOnFreeTS(proposedTechnician: TechnicianDTO, day: string, time: string) {
    let createAppointmentModal: BsModalRef = this.modalService.show(CreateAppointmentModalComponent, {
      class: 'medium-modal'
    });
    createAppointmentModal.content.idParamTechnician = proposedTechnician.idPerson;
    createAppointmentModal.content.selectedDay = day;
    createAppointmentModal.content.paramTime = time;
    createAppointmentModal.content.blocEdition = true;
    createAppointmentModal.content.agenda = this;
  }

  clickOnOccupiedTS(appointment: AppointmentDTO) {
    let appointmentSummaryModal: BsModalRef = this.modalService.show(AppointmentSummaryModalComponent);
    appointmentSummaryModal.content.appointmentInfo = appointment;
    appointmentSummaryModal.content.agenda = this;
    appointmentSummaryModal.content.recharge();
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
