import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PersonOriginDTO} from "../../../../../services/person/client/person-origin-dto";
import {ClientOriginService} from "../../../../../services/person/client/client-origin.service";
import {
  ClientRegistrationService
} from "../../../../../services/person/client/registration/client-registration.service";
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {
  ClientRegistrationFailDTO
} from "../../../../../services/person/client/registration/client-registration-fail-dto";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {AuthenticationService} from "../../../../../services/auth/authentication.service";

@Component({
  selector: 'app-client-registration-modal',
  templateUrl: './client-registration-modal.component.html',
  styleUrls: ['./client-registration-modal.component.css']
})
export class ClientRegistrationModalComponent implements OnInit {

  personOrigins: PersonOriginDTO[] = [];

  selectedLastName: string = "";
  selectedFirstName: string = "";
  selectedEmail: string = "";
  selectedGender: boolean = false;
  selectedPhone: string = "";
  selectedBirthday: string = "";
  selectedPersonOrigin: PersonOriginDTO = PersonOriginDTO.default();

  confirmationModal?: BsModalRef;

  constructor(private clientOriginService: ClientOriginService, private clientRegistrationService: ClientRegistrationService,
              private authenticationService: AuthenticationService, public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeAllPersonOrigins();
    this.authenticationService.checkLogin();
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
    this.confirmationModal = this.modalService.show(template, {class: "modal-lg"});
  }

  close() {
    this.bsModalRef?.hide();
  }

  declineClientRegistration(): void {
    this.confirmationModal?.hide();
  }

  confirmClientRegistration() {
    let clientDTO: ClientDTO = new ClientDTO(-1, this.selectedFirstName, this.selectedLastName,
      this.selectedEmail, this.selectedGender, this.selectedPhone,
      this.selectedBirthday, this.selectedPersonOrigin != null ? this.selectedPersonOrigin.idPersonOrigin : -1);

    this.clientRegistrationService.registerClient(clientDTO).then(() => {
      this.successClientRegistration(clientDTO);
    }).catch((err: ClientRegistrationFailDTO) => {
      this.failClientRegistration(clientDTO, err);
    });
    this.confirmationModal?.hide();
  }

  private successClientRegistration(clientDTO: ClientDTO) {
    this.clear();
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent, {
      initialState: {
        title: "Enregistrement de client réussie",
        text: "L'enregistrement du client " + clientDTO.lastName + " " + clientDTO.firstName + " a réussie"
      }
    });
    successModal.content.parent = this.bsModalRef;
  }

  private failClientRegistration(clientDTO: ClientDTO, err: ClientRegistrationFailDTO) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent, {
      initialState: {
        title: "Enregistrement de client échoué",
        text: "L'enregistrement du client " + clientDTO.lastName + " " + clientDTO.firstName + " a échoué. Erreur = " + err
      }
    });
    failModal.content.parent = this.bsModalRef;
  }

  private clear(): void {
    this.selectedLastName = "";
    this.selectedFirstName = "";
    this.selectedEmail = "";
    this.selectedGender = false;
    this.selectedPhone = "";
    this.selectedBirthday = "";
    this.selectedPersonOrigin = PersonOriginDTO.default();
  }

}
