import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {WaitingRoomService} from "../../../services/waitingroom/waiting-room.service";
import {WaitingRoomDTO} from "../../../services/waitingroom/waiting-room-dto";
import {DateTool} from "../../../tool/date-tool";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {
  ClientWaitingRoomInfoModalComponent
} from "./client-waiting-room-info-modal/client-waiting-room-info-modal.component";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {PersonDTO} from "../../../services/person/person-dto";
import {PersonTool} from "../../../tool/person-tool";

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

  clientWaitingRoomInfo?: BsModalRef;

  constructor(private technicianService: TechnicianService, private waitingRoom: WaitingRoomService,
              private appointmentService: AppointmentService,
              private modalService: BsModalService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.recharge();
    this.authenticationService.checkLogin();
  }

  recharge() {
    this.chargeAllTechnicians();
    this.chargeAllWaitingRoom();
  }

  private chargeAllTechnicians() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
    });
  }

  private chargeAllWaitingRoom() {
    this.techWRMap.clear();
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

  takeClient(wr: WaitingRoomDTO) {
    this.clientWaitingRoomInfo = this.modalService.show(ClientWaitingRoomInfoModalComponent);
    this.clientWaitingRoomInfo.content.wr = wr;
    this.clientWaitingRoomInfo.content.waitingRoomComponent = this;
  }

  formatPersonSimpleIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }
}
