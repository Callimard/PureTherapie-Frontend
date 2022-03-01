import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientDTO} from "../../../../../../../../services/person/client/client-dto";
import {AppointmentDTO} from "../../../../../../../../services/appointment/dto/appointment-dto";
import {PersonDTO} from "../../../../../../../../services/person/person-dto";
import {PersonTool} from "../../../../../../../../tool/person-tool";
import {AppointmentService} from "../../../../../../../../services/appointment/appointment.service";

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.css'],
  host: {'class': 'client-appointments'}
})
export class ClientAppointmentsComponent implements OnInit, OnChanges {

  @Input() client?: ClientDTO;

  clientAppointments: AppointmentDTO[] = [];

  constructor(private appointmentService: AppointmentService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chargeAllClientAppointments();
  }

  private chargeAllClientAppointments() {
    if (this.client != null && this.client.idPerson > 0) {
      this.appointmentService.getAllClientAppointments(this.client.idPerson).then(res => {
        this.clientAppointments = res;
      });
    }
  }

  simpleIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

}
