import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TechnicianDTO} from "../../../../services/person/technician/dto/technician-dto";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";
import {DateTool} from "../../../../tool/date-tool";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {AuthenticationService} from "../../../../services/auth/authentication.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PersonTool} from "../../../../tool/person-tool";
import {PersonDTO} from "../../../../services/person/person-dto";
import {CreateAppointmentModalComponent} from "../create-appointment-modal/create-appointment-modal.component";
import {AppointmentDTO} from "../../../../services/appointment/dto/appointment-dto";
import {AppointmentSummaryModalComponent} from "../appointment-summary-modal/appointment-summary-modal.component";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {Rechargeable} from "../../../../tool/rechargeable";

@Component({
  selector: 'app-agenda-per-technician',
  templateUrl: './agenda-per-technician.component.html',
  styleUrls: ['./agenda-per-technician.component.css'],
  host: {'class': 'agenda-per-technician'}
})
export class AgendaPerTechnicianComponent implements OnInit, OnChanges, Rechargeable {

  private tsColumnSize: string = "5%";
  agendaRowColumn: string = "5% 1fr 1fr 1fr 1fr";

  private agendaLineHeight: string = "10%";
  agendaContentGrid: string = "repeat(18, " + this.agendaLineHeight + ")";

  allTechnicians: TechnicianDTO[] = [];

  @Input() today: string = DateTool.toMySQLDateString(new Date());

  allTS: TimeSlotDTO[] = [];

  technicianTSMap: Map<number, Map<string, TimeSlotDTO>> = new Map<number, Map<string, TimeSlotDTO>>();

  isFirstAppointmentCall: Map<number, boolean> = new Map<number, boolean>();
  fistAppointmentMap: Map<number, boolean> = new Map<number, boolean>();

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService,
              private appointmentService: AppointmentService,
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
    this.clearNewClientMap();
  }

  public updateAgendaRowColumn() {
    if (this.allTechnicians != null && this.allTechnicians.length > 0) {
      let columns = this.tsColumnSize;
      let count = this.allTechnicians.length;
      for (let i = 0; i < count; i++) {
        columns = columns + " 1fr";
      }
      this.agendaRowColumn = columns;
    }
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
      for (let tech of this.allTechnicians)
        this.chargeAllTimeSlots(tech.idPerson);

      this.updateAgendaRowColumn();
    });
  }

  private clearNewClientMap() {
    // Order important.
    this.fistAppointmentMap.clear();
    this.isFirstAppointmentCall.clear();
  }

  private chargeAllTimeSlots(idTechnician: number) {
    this.allTS = [];
    this.agendaService.getAllTimeSlotsOfTechnician(idTechnician, this.today).then((res) => {
      if (this.allTS.length == 0) {
        this.allTS = res;
        this.agendaContentGrid = "repeat(" + this.allTS.length + ", " + this.agendaLineHeight + ")";
      }

      let tsMap: Map<string, TimeSlotDTO> = new Map<string, TimeSlotDTO>();
      for (let ts of res) {
        tsMap.set(ts.begin, ts);
      }
      this.technicianTSMap.set(idTechnician, tsMap);
    });
  }

  getTechnicianTs(idTechnician: number, begin: string): TimeSlotDTO {
    let mapTechTS = this.technicianTSMap.get(idTechnician);

    if (mapTechTS != null) {
      let ts = mapTechTS.get(begin);
      return ts != null ? ts : TimeSlotDTO.default();
    } else {
      return TimeSlotDTO.default();
    }
  }

  formatPersonSimpleIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
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

  tsIsFree(idTech: number, tsBegin: string): boolean {
    return this.getTechnicianTs(idTech, tsBegin).free;
  }

  isFirstAppointment(idTech: number, tsBegin: string): boolean {
    let ts = this.getTechnicianTs(idTech, tsBegin);

    if (this.clientNotWaitingFinalization(idTech, tsBegin)) {
      let idAppointment = ts.appointment.idAppointment;
      let alreadyCall = this.isFirstAppointmentCall.get(idAppointment);
      if (alreadyCall != null && alreadyCall) {
        let isFirstAppointment = this.fistAppointmentMap.get(idAppointment);
        return isFirstAppointment != null ? isFirstAppointment : false;
      } else {
        this.isFirstAppointmentCall.set(idAppointment, true);
        this.fistAppointmentMap.set(idAppointment, false);
        this.appointmentService.isFirstAppointment(ts.appointment.idAppointment).then((res) => {
          this.fistAppointmentMap.set(idAppointment, res);
        });

        let isFirstAppointment = this.fistAppointmentMap.get(idAppointment);
        return isFirstAppointment != null ? isFirstAppointment : false;
      }
    } else {
      return false;
    }
  }

  clientNotWaitingFinalization(idTech: number, tsBegin: string): boolean {
    let ts = this.getTechnicianTs(idTech, tsBegin);
    return !ts.free && (ts.appointment.clientArrival == null || ts.appointment.finalized);
  }

  tsFinalized(idTech: number, tsBegin: string): boolean {
    return !this.getTechnicianTs(idTech, tsBegin).free && this.getTechnicianTs(idTech, tsBegin).appointment.finalized;
  }

  clickOnTs(technician: TechnicianDTO, tsBegin: string): void {
    let ts = this.getTechnicianTs(technician.idPerson, tsBegin);

    if (ts.free)
      this.clickOnFreeTS(technician, ts.day, ts.begin);
    else
      this.clickOnOccupiedTS(ts.appointment);

  }

  private clickOnFreeTS(proposedTechnician: TechnicianDTO, day: string, time: string) {
    let createAppointmentModal: BsModalRef = this.modalService.show(CreateAppointmentModalComponent, {
      class: 'medium-modal'
    });
    createAppointmentModal.content.idParamTechnician = proposedTechnician.idPerson;
    createAppointmentModal.content.selectedDay = day;
    createAppointmentModal.content.paramTime = time;
    createAppointmentModal.content.blocEdition = true;
    createAppointmentModal.content.rechargeable = this;
  }

  private clickOnOccupiedTS(appointment: AppointmentDTO) {
    let appointmentSummaryModal: BsModalRef = this.modalService.show(AppointmentSummaryModalComponent);
    appointmentSummaryModal.content.appointmentInfo = appointment;
    appointmentSummaryModal.content.agenda = this;
    appointmentSummaryModal.content.recharge();
    appointmentSummaryModal.content.rechargeable = this;
  }

}
