import {Component, OnInit} from '@angular/core';
import {AestheticCareService} from "../../../services/product/aesthetic/care/aesthetic-care.service";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {AestheticCareDTO} from "../../../services/product/aesthetic/care/aesthetic-care-dto";
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {FreeTimeSlotDTO} from "../../../services/agenda/free-time-slot-dto";
import {DateTool} from "../../../services/agenda/date-tool";

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.css']
})
export class TakeAppointmentComponent implements OnInit {

  allACs: AestheticCareDTO[] = [];
  allTechnicians: TechnicianDTO[] = [];
  allFreeTS: FreeTimeSlotDTO[] = [];

  acSelected: AestheticCareDTO;
  technicianSelected: TechnicianDTO;
  freeTSSelected: FreeTimeSlotDTO;
  selectedDay: string;

  private readonly today = new Date();

  constructor(private acService: AestheticCareService, private technicianService: TechnicianService,
              private agendaService: AgendaService) {
    this.acSelected = AestheticCareDTO.default();
    this.technicianSelected = TechnicianDTO.default();
    this.freeTSSelected = FreeTimeSlotDTO.default();
    this.selectedDay = DateTool.toMySQLDateString(this.today);
  }

  ngOnInit(): void {
    this.chargeAestheticCares();
    this.chargeTechnician();
  }

  onChangeTechnicianChoice() {
    this.chargeFreeTimeSlots();
  }

  onChangeDay() {
    console.log("Selected day = ", this.selectedDay)
    this.chargeFreeTimeSlots();
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
      this.technicianSelected = this.allTechnicians[0];
      this.chargeFreeTimeSlots();
    });
  }

  private chargeAestheticCares() {
    this.acService.getAllAestheticCare().then(res => {
      this.allACs = res;
      this.acSelected = this.allACs[0];
    });
  }

  private chargeFreeTimeSlots() {
    this.agendaService.getFreeTimeSlots(this.technicianSelected.idPerson, this.selectedDay).then(res => {
      this.allFreeTS = res;
      this.freeTSSelected = this.allFreeTS[0];
    });
  }
}
