import {Component, OnInit, TemplateRef} from '@angular/core';
import {AestheticCareService} from "../../../services/product/aesthetic/care/aesthetic-care.service";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {AestheticCareDTO} from "../../../services/product/aesthetic/care/aesthetic-care-dto";
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {FreeTimeSlotDTO} from "../../../services/agenda/free-time-slot-dto";
import {DateTool} from "../../../tool/date-tool";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {TakeAppointmentDTO} from "../../../services/appointment/take_appointment/take-appointment-dto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClientDTO} from "../../../services/person/client/client-dto";
import {ClientService} from "../../../services/person/client/client.service";
import {GlobalVariables} from "../../../global/global-variables";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppointmentDataService} from "../../../services/appointment/take_appointment/appointment-data.service";
import {AppointmentData} from "../../../services/appointment/take_appointment/appointment-data";
import {SimpleClientInfoDTO} from "../../../services/person/client/simple-client-info-dto";

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
  selectedFreeTS: FreeTimeSlotDTO;
  selectedDay: string;

  client: SimpleClientInfoDTO = SimpleClientInfoDTO.default();

  private readonly today = new Date();

  makeClientResearch: string = GlobalVariables.FALSE_STRING;
  newClient: string = GlobalVariables.FALSE_STRING;

  clientEmail: string = "";
  clientNotFound: boolean = false;
  clientFound: boolean = false;

  modalRef?: BsModalRef;

  takingAppointmentSuccess: boolean = false;

  constructor(private acService: AestheticCareService, private technicianService: TechnicianService,
              private agendaService: AgendaService, private appointmentService: AppointmentService,
              private clientService: ClientService, private appointmentData: AppointmentDataService,
              private router: Router, private route: ActivatedRoute, private modalService: BsModalService) {
    this.selectedAC = AestheticCareDTO.default();
    this.selectedTechnician = TechnicianDTO.default();
    this.selectedFreeTS = FreeTimeSlotDTO.default();
    this.selectedDay = DateTool.toMySQLDateString(this.today);
  }

  ngOnInit(): void {
    this.chargeAestheticCares();
    this.chargeTechnician();
    this.parseURLParams();
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
      this.selectedFreeTS = this.allFreeTS[0];
    });
  }

  private parseURLParams() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.extractMakeClientResearchParam(params);
        this.extractNewClientParam(params);
        this.extractClientIDParam(params);
      },
      error: (fail) => {
        console.log("Fail to load url params, ", fail);
      }
    });
  }

  private extractMakeClientResearchParam(params: Params) {
    this.makeClientResearch = params['makeClientResearch'];
    if (this.makeClientResearch == null)
      this.makeClientResearch = GlobalVariables.FALSE_STRING;
  }

  private extractNewClientParam(params: Params) {
    this.newClient = params['newClient'];
    if (this.newClient == null)
      this.newClient = GlobalVariables.FALSE_STRING;
  }

  private extractClientIDParam(params: Params) {
    this.client.idPerson = Number(params['clientID']);
    if (this.correctClientID())
      this.makeClientResearch = 'false';
  }

  private correctClientID() {
    return !isNaN(this.client.idPerson) && this.client.idPerson > 0;
  }

  private takeAppointment() {
    let takeAppointmentDTO = new TakeAppointmentDTO(this.client.idPerson, this.selectedTechnician.idPerson, this.selectedAC.idAestheticCare,
      this.selectedDay, this.selectedFreeTS.begin);
    this.demandAppointment(takeAppointmentDTO);
  }

  private demandAppointment(takeAppointmentDTO: TakeAppointmentDTO) {
    if (this.newClient === GlobalVariables.FALSE_STRING) {
      if (this.correctClientID()) {
        this.postTakeAppointment(takeAppointmentDTO);
      } else
        console.error("No client ID");
    } else if (this.newClient.match(GlobalVariables.TRUE_STRING)) {
      this.delayToClientRegistration(this.selectedTechnician, this.selectedAC, this.selectedDay, this.selectedFreeTS.begin);
    } else
      console.error("Cannot determine if it is a new client or not");
  }

  private postTakeAppointment(takeAppointmentDTO: TakeAppointmentDTO) {
    this.appointmentService.takeAppointment(takeAppointmentDTO).then(() => {
      this.chargeFreeTimeSlots();
      this.takingAppointmentSuccess = true;
    }).catch((err) => {
      console.error("Fail for taking an appointment", err);
      this.chargeFreeTimeSlots();
    });
  }

  private delayToClientRegistration(technician: TechnicianDTO, ac: AestheticCareDTO, day: string, beginTime: string) {
    let appointmentData = new AppointmentData(-1, technician, ac, day, beginTime);
    this.appointmentData.replaceData(appointmentData);
    console.log("AppointmentService data = ", this.appointmentData.getData());
    this.router.navigate(['/' + GlobalVariables.INTERN_CLIENTS_REGISTRATION_URL], {
      queryParams: {
        validAppointmentAfterRegistration: true
      }
    });
  }

  async searchClient() {
    this.clientNotFound = false;
    this.clientFound = false;

    let client: SimpleClientInfoDTO = await this.clientService.searchClientWithEmail(this.clientEmail);
    if (client == null) {
      this.clientNotFound = true;
      this.client = ClientDTO.default();
    } else {
      this.clientFound = true;
      this.client = client;
    }
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

  openModalTakeAppointmentConfirmation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirmTakingAppointment(): void {
    this.takeAppointment();
    this.modalRef?.hide();
  }

  declineTakingAppointment(): void {
    this.modalRef?.hide();
  }
}
