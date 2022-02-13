import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TechnicianDTO} from "../../../../services/person/technician/technician-dto";
import {DateTool} from "../../../../tool/date-tool";
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/aesthetic-care-dto";
import {FreeTimeSlotDTO} from "../../../../services/agenda/free-time-slot-dto";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {SimpleClientInfoDTO} from "../../../../services/person/client/simple-client-info-dto";
import {ClientService} from "../../../../services/person/client/client.service";
import {TakeAppointmentDTO} from "../../../../services/appointment/take_appointment/take-appointment-dto";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {AgendaComponent} from "../agenda.component";

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrls: ['./create-appointment-modal.component.css']
})
export class CreateAppointmentModalComponent implements OnInit {
  idParamTechnician?: number;
  paramTime?: string;

  blocEdition: boolean = false;

  allACs: AestheticCareDTO[] = [];
  allTechnicians: TechnicianDTO[] = [];
  allFreeTS: FreeTimeSlotDTO[] = [];

  selectedAC: AestheticCareDTO;
  selectedTechnician: TechnicianDTO;
  selectedFreeTS: FreeTimeSlotDTO;
  selectedDay: string = DateTool.toMySQLDateString(new Date());

  displaySearchClient: boolean = true;
  client?: SimpleClientInfoDTO;

  recapAppointmentModalRef?: BsModalRef;

  agenda?: AgendaComponent;

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
      if (this.idParamTechnician !== undefined) {
        let found = false;
        for (let tech of this.allTechnicians) {
          if (tech.idPerson == this.idParamTechnician) {
            this.selectedTechnician = tech;
            found = true;
            break;
          }
        }

        if (!found)
          this.selectedTechnician = this.allTechnicians[0];
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
      if (this.paramTime !== undefined) {
        let found = false;
        for (let freeTS of this.allFreeTS) {
          if (freeTS.begin === this.paramTime) {
            this.selectedFreeTS = freeTS;
            found = true;
            break;
          }
        }

        if (!found)
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
    if (this.client != null) {
      let takeAppointmentDTO = new TakeAppointmentDTO(this.client.idPerson, this.selectedTechnician.idPerson, this.selectedAC.idAestheticCare,
        this.selectedDay, this.selectedFreeTS.begin);
      this.demandAppointment(takeAppointmentDTO);
    } else
      console.error("Client is null => cannot create an appointment");
  }

  private demandAppointment(takeAppointmentDTO: TakeAppointmentDTO) {
    this.appointmentService.takeAppointment(takeAppointmentDTO).then(() => {
      this.creationAppointmentSuccess();
    }).catch((err) => {
      this.creationAppointmentFail(err);
    });
  }

  private creationAppointmentSuccess() {
    this.chargeFreeTimeSlots();
    this.modalService.show(SuccessModalComponent, {
      initialState: {
        title: "Création du rendez-vous réussie",
        text: "La création du rendez-vous a réussie!"
      }
    });
    this.agenda?.recharge();
    this.bsModalRef.hide();
  }

  private creationAppointmentFail(err: any) {
    console.error("Fail for taking an appointment", err);
    this.chargeFreeTimeSlots();
    this.modalService.show(FailModalComponent, {
      initialState: {
        title: "Création du rendez-vous échouée",
        text: "La création du rendez-vous n'a pas réussie."
      }
    });
  }

  updateClientAppointment(client: SimpleClientInfoDTO) {
    this.client = client;
  }

}
