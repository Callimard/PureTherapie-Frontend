import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../services/person/technician/technician-dto";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {AppointmentDTO} from "../../../services/appointment/appointment-dto";

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class WaitingRoomComponent implements OnInit {

  allTechnicians: TechnicianDTO[] = [];
  waitingClientAppointments: AppointmentDTO[] = [];

  constructor(private technicianService: TechnicianService) {
  }

  ngOnInit(): void {
    this.chargeAllTechnicians();
    for (let i = 0; i < 20; i++) {
      this.waitingClientAppointments.push(AppointmentDTO.default());
    }
  }

  private chargeAllTechnicians() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
    });
  }

}
