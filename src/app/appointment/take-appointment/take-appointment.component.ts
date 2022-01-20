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
import {ActivatedRoute} from "@angular/router";
import {ClientDTO} from "../../../services/person/client/client-dto";
import {ClientService} from "../../../services/person/client/client.service";
import {GlobalVariables} from "../../../global/global-variables";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.css']
})
export class TakeAppointmentComponent implements OnInit {

  public readonly NO_CLIENT_ID_PARAM: string = "NO_CLIENT_ID_PARAM";

  allACs: AestheticCareDTO[] = [];
  allTechnicians: TechnicianDTO[] = [];
  allFreeTS: FreeTimeSlotDTO[] = [];

  selectedAC: AestheticCareDTO;
  selectedTechnician: TechnicianDTO;
  freeTSSelected: FreeTimeSlotDTO;
  selectedDay: string;

  private clientID: number = -1;

  private readonly today = new Date();

  makeClientResearch: string = GlobalVariables.FALSE_STRING;

  clientEmail: string = "";
  clientNotFound: boolean = false;
  clientFound: boolean = false;

  constructor(private acService: AestheticCareService, private technicianService: TechnicianService,
              private agendaService: AgendaService, private appointmentService: AppointmentService,
              private dialog: MatDialog, private clientService: ClientService, private route: ActivatedRoute) {
    this.selectedAC = AestheticCareDTO.default();
    this.selectedTechnician = TechnicianDTO.default();
    this.freeTSSelected = FreeTimeSlotDTO.default();
    this.selectedDay = DateTool.toMySQLDateString(this.today);
  }

  ngOnInit(): void {
    this.chargeAestheticCares();
    this.chargeTechnician();
    this.parseURLParams();
  }

  private parseURLParams() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.makeClientResearch = params['makeClientResearch'];
        if (this.makeClientResearch == null)
          this.makeClientResearch = GlobalVariables.FALSE_STRING;

        this.clientID = Number(params['clientID']);

        if (this.correctClientID())
          this.makeClientResearch = 'false';

      },
      error: (fail) => {
        console.log("Fail to load url params, ", fail);
      }
    });
  }

  private correctClientID() {
    return !isNaN(this.clientID) && this.clientID > 0;
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

  onAcceptToTakeAppointment() {
    if (this.correctClientID()) {
      let takeAppointmentDTO = new TakeAppointmentDTO(this.clientID, this.selectedTechnician.idPerson, this.selectedAC.idAestheticCare,
        this.selectedDay, this.freeTSSelected.begin);

      this.appointmentService.takeAppointment(takeAppointmentDTO).then(() => {
        this.chargeFreeTimeSlots();
      }).catch((err) => {
        console.error("Fail for taking an appointment", err);
        this.chargeFreeTimeSlots();
      })
    } else
      console.error("No client ID");
  }

  async searchClient() {
    this.clientNotFound = false;
    this.clientFound = false;

    let client: ClientDTO = await this.clientService.searchClientWithEmail(this.clientEmail);
    if (client == null) {
      this.clientNotFound = true;
    } else {
      this.clientFound = true;
      this.clientID = client.idPerson;
    }
  }
}
