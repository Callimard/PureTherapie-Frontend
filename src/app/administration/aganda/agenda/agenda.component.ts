import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";
import {DateTool} from "../../../../services/agenda/date-tool";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class AgendaComponent implements OnInit {

  technicians: TechnicianDTO[] = [];
  timeSlots: TimeSlotDTO[] = [];

  today: string = DateTool.toMySQLDateString(new Date());

  constructor(private technicianService: TechnicianService, private agendaService: AgendaService) {
  }

  ngOnInit(): void {
    this.chargeTechnician()
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.technicians = res;
      this.chargeAllTimeSlots();
    });
  }

  private chargeAllTimeSlots() {
    this.agendaService.getAllTimeSlots(this.today).then((res) => {
      this.timeSlots = res;
      console.log("Success to charge TS => ", this.timeSlots);
    });
  }

}
