import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TechnicianDTO} from "../../../../../services/person/technician/technician-dto";
import {DateTool} from "../../../../../services/agenda/date-tool";
import {AestheticCareDTO} from "../../../../../services/product/aesthetic/care/aesthetic-care-dto";
import {FreeTimeSlotDTO} from "../../../../../services/agenda/free-time-slot-dto";
import {TechnicianService} from "../../../../../services/person/technician/technician.service";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {AgendaService} from "../../../../../services/agenda/agenda.service";
import {SimpleClientInfoDTO} from "../../../../../services/person/client/simple-client-info-dto";
import {ClientService} from "../../../../../services/person/client/client.service";
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {TakeAppointmentDTO} from "../../../../../services/appointment/take_appointment/take-appointment-dto";
import {AppointmentService} from "../../../../../services/appointment/appointment.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrls: ['./create-appointment-modal.component.css']
})
export class CreateAppointmentModalComponent implements OnInit {

  proposedTechnician?: TechnicianDTO;
  time?: string;

  allACs: AestheticCareDTO[] = [];
  allTechnicians: TechnicianDTO[] = [];
  allFreeTS: FreeTimeSlotDTO[] = [];

  selectedAC: AestheticCareDTO;
  selectedTechnician: TechnicianDTO;
  selectedFreeTS: FreeTimeSlotDTO;
  selectedDay: string = DateTool.toMySQLDateString(new Date());

  hasSearchClient = false;
  clientFound = false;
  client: SimpleClientInfoDTO = SimpleClientInfoDTO.default();
  clientEmail: string = "";

  recapAppointmentModalRef?: BsModalRef;

  constructor(private clientService: ClientService, private appointmentService: AppointmentService,
              private acService: AestheticCareService, private technicianService: TechnicianService,
              private agendaService: AgendaService, public bsModalRef: BsModalRef,
              private modalService: BsModalService) {
    this.selectedAC = AestheticCareDTO.default();
    this.selectedTechnician = TechnicianDTO.default();
    this.selectedFreeTS = FreeTimeSlotDTO.default();
  }

  ngOnInit(): void {
    this.chargeAestheticCares();
    this.chargeTechnician();
  }

  closeCreateAppointmentModal() {
    this.bsModalRef?.hide();
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
      if (this.proposedTechnician != null) {
        this.selectedTechnician = this.proposedTechnician;
      } else {
        this.selectedTechnician = this.allTechnicians[0];
      }
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
      if (this.time != null) {
        for (let freeTS of this.allFreeTS) {
          if (freeTS.begin === this.time) {
            this.selectedFreeTS = freeTS;
            return;
          }
        }
        this.selectedFreeTS = this.allFreeTS[0];
      } else {
        this.selectedFreeTS = this.allFreeTS[0];
      }
    });
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

  openCreateAppointmentConfirmationModal(template: TemplateRef<any>) {
    this.recapAppointmentModalRef = this.modalService.show(template);
  }

  declineCreateAppointment(): void {
    this.recapAppointmentModalRef?.hide();
  }

  confirmCreateAppointment(): void {
    this.createAppointment();
    this.recapAppointmentModalRef?.hide();
  }

  private createAppointment() {
    let takeAppointmentDTO = new TakeAppointmentDTO(this.client.idPerson, this.selectedTechnician.idPerson, this.selectedAC.idAestheticCare,
      this.selectedDay, this.selectedFreeTS.begin);
    this.demandAppointment(takeAppointmentDTO);
  }

  private demandAppointment(takeAppointmentDTO: TakeAppointmentDTO) {
    this.appointmentService.takeAppointment(takeAppointmentDTO).then(() => {
      this.chargeFreeTimeSlots();
      this.modalService.show(SuccessModalComponent, {
        initialState: {
          title: "Création du rendez-vous réussie",
          text: "La création du rendez-vous a réussie!"
        }
      });
      this.bsModalRef.hide();
    }).catch((err) => {
      console.error("Fail for taking an appointment", err);
      this.chargeFreeTimeSlots();
      this.modalService.show(FailModalComponent, {
        initialState: {
          title: "Création du rendez-vous échouée",
          text: "La création du rendez-vous n'a pas réussie."
        }
      });
    });
  }

  async searchClient() {
    let client: SimpleClientInfoDTO = await this.clientService.searchClientWithEmail(this.clientEmail);
    if (client == null) {
      this.hasSearchClient = true;
      this.clientFound = false;
      this.client = ClientDTO.default();
    } else {
      this.hasSearchClient = true;
      this.clientFound = true;
      this.client = client;
    }
  }

}
