import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PersonTool} from "../../../../services/util/person-tool";
import {ClientDTO} from "../../../../services/person/client/client-dto";
import {TechnicianDTO} from "../../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/aesthetic-care-dto";
import {WaitingRoomDTO} from "../../../../services/waitingroom/waiting-room-dto";
import {DateTool} from "../../../../services/agenda/date-tool";
import {WaitingRoomService} from "../../../../services/waitingroom/waiting-room.service";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {WaitingRoomComponent} from "../waiting-room.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-client-waiting-room-info-modal',
  templateUrl: './client-waiting-room-info-modal.component.html',
  styleUrls: ['./client-waiting-room-info-modal.component.css']
})
export class ClientWaitingRoomInfoModalComponent implements OnInit {

  wr: WaitingRoomDTO = WaitingRoomDTO.default();

  idTechnician?: number;
  idAestheticCare?: number;

  technicians: TechnicianDTO[] = [];
  allACs: AestheticCareDTO[] = [];

  selectedTechnician: TechnicianDTO = TechnicianDTO.default();
  selectedAC: AestheticCareDTO = AestheticCareDTO.default();

  waitingRoomComponent?: WaitingRoomComponent;

  constructor(private technicianService: TechnicianService, private acService: AestheticCareService,
              private wrService: WaitingRoomService,
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
