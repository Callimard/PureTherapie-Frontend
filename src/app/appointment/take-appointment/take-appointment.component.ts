import {Component, OnInit} from '@angular/core';
import {AestheticCareService} from "../../../services/product/aesthetic/care/aesthetic-care.service";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {AestheticCareDTO} from "../../../services/product/aesthetic/care/aesthetic-care-dto";
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {FreeTimeSlotDto} from "../../../services/agenda/free-time-slot-dto";

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.css']
})
export class TakeAppointmentComponent implements OnInit {

  allACs: AestheticCareDTO[] = [];
  allTechnicians: TechnicianDTO[] = [];
  allFreeTS: FreeTimeSlotDto[] = [];

  constructor(private acService: AestheticCareService, private technicianService: TechnicianService, private agendaService: AgendaService) {
  }

  ngOnInit(): void {
    this.acService.getAllAestheticCare().then(res => {
      this.allACs = res;
    });
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;

      this.agendaService.getFreeTimeSlots(this.allTechnicians[0].idPerson, new Date().toLocaleDateString()).then(res => {
        this.allFreeTS = res;
      });
    });
  }

}
