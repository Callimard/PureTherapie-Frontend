import {Component, OnInit, TemplateRef} from '@angular/core';
import {ClientOriginService} from "../../../services/person/client/client-origin.service";
import {PersonOriginDTO} from "../../../services/person/client/person-origin-dto";
import {ClientDTO} from "../../../services/person/client/client-dto";
import {ClientRegistrationService} from "../../../services/person/client/registration/client-registration.service";
import {ClientRegistrationFailDTO} from "../../../services/person/client/registration/client-registration-fail-dto";
import {GlobalVariables} from "../../../global/global-variables";
import {ActivatedRoute, Params} from "@angular/router";
import {AppointmentDataService} from "../../../services/appointment/take_appointment/appointment-data.service";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AppointmentData} from "../../../services/appointment/take_appointment/appointment-data";
import {TakeAppointmentDTO} from "../../../services/appointment/take_appointment/take-appointment-dto";

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent implements OnInit {

  personOrigins: PersonOriginDTO[] = [];

  validAppointmentAfterRegistration: string = GlobalVariables.FALSE_STRING;

  modalRef?: BsModalRef;

  appointmentData: AppointmentData = AppointmentData.default();

  selectedLastName: string = "";
  selectedFirstName: string = "";
  selectedEmail: string = "";
  selectedGender: boolean = false;
  selectedPhone: string = "";
  selectedBirthday: string = "";
  selectedPersonOrigin: PersonOriginDTO = PersonOriginDTO.default();

  success: boolean = false;
  chooseAlsoTakingAppointment: boolean = false;

  constructor(private clientOriginService: ClientOriginService, private clientRegistrationService: ClientRegistrationService,
              private appointmentService: AppointmentService, private appointmentDataService: AppointmentDataService,
              private modalService: BsModalService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.chargeAllPersonOrigins();
    this.parseURLParams();
    let appData = this.appointmentDataService.getData()
    if (appData != null)
      this.appointmentData = appData;
    console.log('Appointment Data get = ', this.appointmentData);
  }

  private parseURLParams() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.extractValidAppointmentAfterRegistrationParam(params);
      },
      error: (fail) => {
        console.log("Fail to load url params, ", fail);
      }
    });
  }

  private extractValidAppointmentAfterRegistrationParam(params: Params) {
    this.validAppointmentAfterRegistration = params['validAppointmentAfterRegistration'];
    if (this.validAppointmentAfterRegistration == null)
      this.validAppointmentAfterRegistration = GlobalVariables.FALSE_STRING;
  }

  private chargeAllPersonOrigins() {
    this.clientOriginService.getAllPersonOrigins().then((origins) => {
      this.personOrigins = origins;
      this.selectedPersonOrigin = this.personOrigins[0];
    }).catch(err => {
      console.log("Fail to receive person origins");
      console.log(err);
    });
  }

  openModalClientRegistrationSuccess(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  declineClientRegistration(): void {
    this.modalRef?.hide();
  }

  confirmOnlyClientRegistration() {
    let clientRegistrationDTO: ClientDTO = new ClientDTO(-1, this.selectedFirstName, this.selectedLastName,
      this.selectedEmail, this.selectedGender, this.selectedPhone,
      this.selectedBirthday, this.selectedPersonOrigin != null ? this.selectedPersonOrigin.idPersonOrigin : -1);

    this.clientRegistrationService.registerClient(clientRegistrationDTO).then(() => {
      this.success = true;
    }).catch((err: ClientRegistrationFailDTO) => {
      console.log("Client registration error = ", err);
    });
    this.modalRef?.hide();
  }

  confirmClientRegistrationAndAppointment() {
    this.chooseAlsoTakingAppointment = true;

    let clientDTO: ClientDTO = new ClientDTO(-1, this.selectedFirstName, this.selectedLastName,
      this.selectedEmail, this.selectedGender, this.selectedPhone, this.selectedBirthday,
      this.selectedPersonOrigin != null ? this.selectedPersonOrigin.idPersonOrigin : -1);
    this.clientRegistrationService.registerClient(clientDTO).then((successResponse) => {
      this.demandAppointment(successResponse.idClient);
    }).catch((err: ClientRegistrationFailDTO) => {
      console.log("Client registration error = ", err);
    });
    this.modalRef?.hide();
  }

  private demandAppointment(clientID: number) {
    if (this.appointmentData != null) {
      this.appointmentData.clientId = clientID;
      console.log("Appointment data = ", this.appointmentData);
      let takeAppointmentDTO = new TakeAppointmentDTO(this.appointmentData.clientId, this.appointmentData.technician.idPerson,
        this.appointmentData.ac.idAestheticCare, this.appointmentData.day, this.appointmentData.beginTime,
        this.appointmentData.overlapAuthorized);
      this.appointmentService.takeAppointment(takeAppointmentDTO).then(() => {
        this.success = true;
      }).catch((err) => {
        console.error("Taking appointment fail, ", err);
      });
    } else {
      console.error('No Appointment data => cannot demand to take an appointment');
    }
  }
}
