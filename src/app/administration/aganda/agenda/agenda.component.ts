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

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
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

  recharge() {
    this.chargeTechnician()
  }

}
