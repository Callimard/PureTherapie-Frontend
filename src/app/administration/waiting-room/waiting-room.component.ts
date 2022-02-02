import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {WaitingRoomService} from "../../../services/waitingroom/waiting-room.service";
import {WaitingRoomDTO} from "../../../services/waitingroom/waiting-room-dto";

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class WaitingRoomComponent implements OnInit {

  allTechnicians: TechnicianDTO[] = [];

  waitingRoomRows: WaitingRoomDTO[] = [];
  techWRMap: Map<number, WaitingRoomDTO[]> = new Map<number, WaitingRoomDTO[]>();

  constructor(private technicianService: TechnicianService, private waitingRoom: WaitingRoomService) {
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

}
