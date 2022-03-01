// noinspection DuplicatedCode

import {Component, OnInit} from '@angular/core';
import {AppointmentDTO} from "../../../../services/appointment/dto/appointment-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientService} from "../../../../services/person/client/client.service";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {AgendaComponent} from "../agenda.component";
import {SimpleResponseDTO} from "../../../../services/util/simple-response-dto";
import {SurbookingService} from "../../../../services/appointment/surbooking.service";
import {SurbookingDTO} from "../../../../services/appointment/dto/surbooking-dto";

@Component({
  selector: 'app-client-arrival-modal',
  templateUrl: './client-arrival-modal.component.html',
  styleUrls: ['./client-arrival-modal.component.css']
})
export class ClientArrivalModalComponent implements OnInit {
  clientAppointment: AppointmentDTO = AppointmentDTO.default();

  modeSurbooking: boolean = false;
  surbooking?: SurbookingDTO;

  parent?: BsModalRef;

  agenda?: AgendaComponent;

  constructor(private clientService: ClientService, private appointmentService: AppointmentService,
              private surbookingService: SurbookingService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    // Normal
  }

  close() {
    this.bsModalRef.hide();
  }

  placeClientInWaitingRoom(idClient: number, idAppointment: number) {
    if (!this.modeSurbooking) {
      this.appointmentService.clientArrival(idClient, idAppointment).then(() => {
        this.successPlaceInWaitingRoom();
      }).catch((err) => {
        this.failPlaceInWaitingRoom(err);
      });
    } else {
      if (this.surbooking != null) {
        this.surbookingService.clientArrive(this.surbooking.idSurbooking).then(() => {
          this.successPlaceInWaitingRoom();
        }).catch((err) => {
          this.failPlaceInWaitingRoom(err);
        });
      }
    }
  }

  private successPlaceInWaitingRoom() {
    let successModalRef: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModalRef.content.title = "Arrivée client prise en compte";
    successModalRef.content.text = "L'arrivée du client a bien été prise en compte. " +
      "Il a été placé dans la salle d'attente";
    successModalRef.content.parent = this.bsModalRef;
    this.agenda?.recharge();
    this.parent?.hide();
  }

  private failPlaceInWaitingRoom(err: SimpleResponseDTO) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Arrivée client non prise en compte";
    failModal.content.text = "L'arrivée du client n'a pas été prise en compte. Erreur = <strong>" + err.message + "</strong>";
    failModal.content.parent = this.bsModalRef;
  }
}
