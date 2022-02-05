// noinspection DuplicatedCode

import {Component, OnInit} from '@angular/core';
import {AppointmentDTO} from "../../../../services/appointment/appointment-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientService} from "../../../../services/person/client/client.service";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";
import {AgendaComponent} from "../agenda.component";

@Component({
  selector: 'app-client-arrival-modal',
  templateUrl: './client-arrival-modal.component.html',
  styleUrls: ['./client-arrival-modal.component.css']
})
export class ClientArrivalModalComponent implements OnInit {
  clientAppointment: AppointmentDTO = AppointmentDTO.default();

  parent?: BsModalRef;

  agenda?: AgendaComponent;

  constructor(private clientService: ClientService, private appointmentService: AppointmentService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.bsModalRef.hide();
  }

  placeClientInWaitingRoom(idClient: number, idAppointment: number) {
    this.appointmentService.clientArrival(idClient, idAppointment).then(() => {
      this.successPlaceInWaitingRoom();
    }).catch(() => {
      this.failPlaceInWaitingRoom();
    })
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

  private failPlaceInWaitingRoom() {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Arrivée client non prise en compte";
    failModal.content.text = "L'arrivée du client n'a pas été prise en compte.";
    failModal.content.parent = this.bsModalRef;
  }
}
