import {Component, OnInit} from '@angular/core';
import {AestheticCareService} from "../../../services/product/aesthetic/care/aesthetic-care.service";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {AestheticCareDTO} from "../../../services/product/aesthetic/care/aesthetic-care-dto";
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {FreeTimeSlotDTO} from "../../../services/agenda/free-time-slot-dto";
import {DateTool} from "../../../services/agenda/date-tool";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {TakeAppointmentDTO} from "../../../services/appointment/take_appointment/take-appointment-dto";

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.css']
})
export class TakeAppointmentComponent implements OnInit {

  allACs: AestheticCareDTO[] = [];
  allTechnicians: TechnicianDTO[] = [];
  allFreeTS: FreeTimeSlotDTO[] = [];

  selectedAC: AestheticCareDTO;
  selectedTechnician: TechnicianDTO;
  freeTSSelected: FreeTimeSlotDTO;
  selectedDay: string;

  private clientID: number = 9;

  private readonly today = new Date();

  constructor(private acService: AestheticCareService, private technicianService: TechnicianService,
              private agendaService: AgendaService, private appointmentService: AppointmentService) {
    this.selectedAC = AestheticCareDTO.default();
    this.selectedTechnician = TechnicianDTO.default();
    this.freeTSSelected = FreeTimeSlotDTO.default();
    this.selectedDay = DateTool.toMySQLDateString(this.today);
  }

  ngOnInit(): void {
    this.chargeAestheticCares();
    this.chargeTechnician();
  }

  onChangeAC() {
    this.chargeFreeTimeSlots();
  }

  onChangeTechnicianChoice() {
    this.chargeFreeTimeSlots();
  }

  onChangeDay() {
    this.chargeFreeTimeSlots();
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
      this.selectedTechnician = this.allTechnicians[0];
      this.chargeFreeTimeSlots();
    });
  }

  private chargeAestheticCares() {
    this.acService.getAllAestheticCare().then(res => {
      this.allACs = res;
      this.selectedAC = this.allACs[0];
    });
  }

  private chargeFreeTimeSlots() {
    this.agendaService.getFreeTimeSlots(this.selectedTechnician.idPerson, this.selectedDay, this.selectedAC.timeExecution).then(res => {
      this.allFreeTS = res;
      this.freeTSSelected = this.allFreeTS[0];
    });
  }

  onSubmit() {
    let takeAppointmentDTO = new TakeAppointmentDTO(this.clientID, this.selectedTechnician.idPerson, this.selectedAC.idAestheticCare,
      this.selectedDay, this.freeTSSelected.begin);

    this.appointmentService.takeAppointment(takeAppointmentDTO).then((res) => {
      console.log("Success TA", res);
      this.chargeFreeTimeSlots();
    }).catch((err) => {
      console.log("Fail TA", err);
      this.chargeFreeTimeSlots();
    })
  }
}
