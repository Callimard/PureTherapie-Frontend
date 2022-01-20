import {Component, OnInit} from '@angular/core';
import {ClientOriginService} from "../../../services/person/client/client-origin.service";
import {NgForm} from "@angular/forms";
import {PersonOriginDTO} from "../../../services/person/client/person-origin-dto";
import {ClientDTO} from "../../../services/person/client/client-dto";
import {ClientRegistrationService} from "../../../services/person/client/registration/client-registration.service";
import {ClientRegistrationFailDTO} from "../../../services/person/client/registration/client-registration-fail-dto";

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent implements OnInit {

  public static readonly MALE: string = "male";
  public static readonly FEMALE: string = "female";

  defaultGender: string = ClientRegistrationComponent.MALE;

  personOrigins: PersonOriginDTO[] = [];

  constructor(private clientOriginService: ClientOriginService, private clientRegistrationService: ClientRegistrationService) {
  }

  ngOnInit(): void {
    this.clientOriginService.getAllPersonOrigins().then((origins) => {
      console.log("Receive origin");
      console.log(origins);
      this.personOrigins = origins;
    }).catch(err => {
      console.log("Fail to receive person origins");
      console.log(err);
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;

    let clientRegistrationDTO: ClientDTO = new ClientDTO(-1, value['firstName'], value['lastName'],
      value['email'], value['gender'] === ClientRegistrationComponent.FEMALE, '+33' + value['phone'],
      value['birthday'], value['origin'].idPersonOrigin);

    console.log('ClientRegistrationDTO {}', clientRegistrationDTO);
    this.clientRegistrationService.registerClient(clientRegistrationDTO).then((successResponse) => {
      console.log("Client registration success = ", successResponse);
    }).catch((err: ClientRegistrationFailDTO) => {
      console.log("Client registration error = ", err);
    })
  }

}
