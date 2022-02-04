import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {WaitingRoomService} from "../../../services/waitingroom/waiting-room.service";
import {WaitingRoomDTO} from "../../../services/waitingroom/waiting-room-dto";
import {DateTool} from "../../../services/agenda/date-tool";
import {AppointmentDTO} from "../../../services/appointment/appointment-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {SuccessModalComponent} from "../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class WaitingRoomComponent implements OnInit {

  today: string = DateTool.toMySQLDateString(new Date());

  allTechnicians: TechnicianDTO[] = [];

  waitingRoomRows: WaitingRoomDTO[] = [];
  techWRMap: Map<number, WaitingRoomDTO[]> = new Map<number, WaitingRoomDTO[]>();

  confirmationModal?: BsModalRef;

  constructor(private technicianService: TechnicianService, private waitingRoom: WaitingRoomService,
              private appointmentService: AppointmentService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeAllTechnicians();
    this.chargeAllWaitingRoom();
  }

  private chargeAllTechnicians() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
    });
  }

  private chargeAllWaitingRoom() {
    this.waitingRoom.getAllWaitingRoomRow().then((res) => {
      this.waitingRoomRows = res;
      for (let wr of this.waitingRoomRows) {
        if (wr.appointment != null) {
          if (this.techWRMap.get(wr.appointment.technician.idPerson) != null) {
            this.techWRMap.get(wr.appointment.technician.idPerson)?.push(wr);
          } else {
            let l: WaitingRoomDTO[] = [];
            l.push(wr);
            this.techWRMap.set(wr.appointment.technician.idPerson, l);
          }
        } else {
          if (this.techWRMap.get(-1) != null) {
            this.techWRMap.get(-1)?.push(wr);
          } else {
            let l: WaitingRoomDTO[] = [];
            l.push(wr);
            this.techWRMap.set(-1, l);
          }
        }
      }
    }).catch(() => {
      console.error("Fail to charge all waiting room rows");
    })
  }

  getOnlyTime(date: string) {
    return DateTool.extractOnlyTime(date);
  }

  takeClientWithAppointment(appointment: AppointmentDTO) {
    this.confirmationModal = this.modalService.show(SimpleConfirmationModalComponent);
    this.confirmationModal.content.title = "Envoyer le client en soin";
    this.confirmationModal.content.text = "Etes-vous sûr de vouloir envoyer le client en soin? Cela réduira son stock de" +
      " soin en fonction du soin choisit lors de son Rendez-vous. Le soin pratiqué sera enregistré pour le/la " +
      "technicien(ne) du rendez-vous.";
    this.confirmationModal.content.confirmationFunction = () => {
      this.appointmentService.provisionClientWithAppointment(appointment.client.idPerson).then(() => {
        this.successProvisionClient();
      }).catch(() => {
        this.failProvisionClient();
      })
    }
  }

  private successProvisionClient() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Client mis en soin réussi";
    successModal.content.text = "Le client a bien été placé en soin";
    successModal.content.parent = this.confirmationModal;
  }

  private failProvisionClient() {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Echec de la mise en soin du client";
    failModal.content.text = "Le client n'a pas été placé en soin";
    failModal.content.parent = this.confirmationModal;
  }
}
