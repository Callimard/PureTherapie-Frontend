import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";
import {DateTool} from "../../../../services/agenda/date-tool";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CreateAppointmentModalComponent} from "./create-appointment-modal/create-appointment-modal.component";

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

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeTechnician()
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
  }

}
