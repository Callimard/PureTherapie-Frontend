import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PersonTool} from "../../../../tool/person-tool";
import {ClientDTO} from "../../../../services/person/client/client-dto";
import {TechnicianDTO} from "../../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/aesthetic-care-dto";
import {WaitingRoomDTO} from "../../../../services/waitingroom/waiting-room-dto";
import {DateTool} from "../../../../tool/date-tool";
import {WaitingRoomService} from "../../../../services/waitingroom/waiting-room.service";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {WaitingRoomComponent} from "../waiting-room.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {AppointmentService} from "../../../../services/appointment/appointment.service";

@Component({
  selector: 'app-client-waiting-room-info-modal',
  templateUrl: './client-waiting-room-info-modal.component.html',
  styleUrls: ['./client-waiting-room-info-modal.component.css']
})
export class ClientWaitingRoomInfoModalComponent implements OnInit {

  wr: WaitingRoomDTO = WaitingRoomDTO.default();

  technicians: TechnicianDTO[] = [];
  allACs: AestheticCareDTO[] = [];

  selectedTechnician: TechnicianDTO = TechnicianDTO.default();
  selectedAC: AestheticCareDTO = AestheticCareDTO.default();

  waitingRoomComponent?: WaitingRoomComponent;

  constructor(private technicianService: TechnicianService, private acService: AestheticCareService,
              private wrService: WaitingRoomService, private appointmentService: AppointmentService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeTechnician();
    this.chargeAestheticCares();
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.technicians = res;
      this.selectedTechnician = this.technicians[0];
    });
  }

  private chargeAestheticCares() {
    this.acService.getAllAestheticCare().then(res => {
      this.allACs = res;
      this.selectedAC = this.allACs[0];
    });
  }

  public close() {
    this.bsModalRef.hide();
  }

  formatPersonIdentifier(client: ClientDTO) {
    return PersonTool.formatPersonSimpleIdentifier(client);
  }

  extractOnlyTime(dateTime: string): string {
    return DateTool.extractOnlyTime(dateTime);
  }

  sendToPracticing(wr: WaitingRoomDTO) {
    let confirmSendClientToPracticingModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmSendClientToPracticingModal.content.title = "Envoyer le client en soin";
    confirmSendClientToPracticingModal.content.text = "Etes-vous sûr de vouloir envoyer le client en soin? Cela réduira son stock de" +
      " soin en fonction du soin choisit lors de son Rendez-vous. Le soin pratiqué sera enregistré pour le/la " +
      "technicien(ne) du rendez-vous.";
    confirmSendClientToPracticingModal.content.confirmationFunction = () => {
      if (wr.appointment != null) {
        this.appointmentService.provisionClientWithAppointment(wr.client.idPerson).then(() => {
          this.successProvisionClient();
        }).catch(() => {
          this.failProvisionClient();
        })
      } else {
        this.appointmentService.provisionClientWithoutAppointment(wr.client.idPerson, this.selectedTechnician.idPerson,
          this.selectedAC.idAestheticCare).then(() => {
          this.successProvisionClient();
        }).catch(() => {
          this.failProvisionClient();
        })
      }
    }
  }

  private successProvisionClient() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Client a été mis en soin";
    successModal.content.text = "Le client a bien été placé en soin";
    successModal.content.parent = this.bsModalRef;
    this.waitingRoomComponent?.recharge();
  }

  private failProvisionClient() {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Echec de la mise en soin du client";
    failModal.content.text = "Le client n'a pas pu être placé en soin";
    failModal.content.parent = this.bsModalRef;
  }

  clientLeaveWR(idClient: number) {
    this.wrService.removeClientFromWaitingRoom(idClient).then(() => {
      this.successRemoveClientFromWR();
    }).catch(() => {
      this.failRemoveClientFromWR();
    })
  }

  private successRemoveClientFromWR() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Client retiré de la salle d'attente";
    successModal.content.text = "Le client a été rétiré de la salle d'attente sans avoir reçu de soin";
    successModal.content.parent = this.bsModalRef;
    this.waitingRoomComponent?.ngOnInit();
  }

  private failRemoveClientFromWR() {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Client non retiré de la salle d'attente";
    failModal.content.text = "Le client n'a pas été rétiré de la salle d'attente";
    failModal.content.parent = this.bsModalRef;
    this.waitingRoomComponent?.ngOnInit();
  }
}
