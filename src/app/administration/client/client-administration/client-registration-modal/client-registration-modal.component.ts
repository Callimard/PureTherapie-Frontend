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
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeAllPersonOrigins();
  }

  private chargeAllPersonOrigins() {
    this.clientOriginService.getAllPersonOrigins().then((origins) => {
      this.personOrigins = origins;
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

  confirmOnlyClientRegistration() {
    let clientDTO: ClientDTO = new ClientDTO(-1, this.selectedFirstName, this.selectedLastName,
      this.selectedEmail, this.selectedGender, this.selectedPhone,
      this.selectedBirthday, this.selectedPersonOrigin != null ? this.selectedPersonOrigin.idPersonOrigin : -1);

    this.clientRegistrationService.registerClient(clientDTO).then(() => {
      this.clear();
      this.modalService.show(SuccessModalComponent, {
        initialState: {
          title: "Enregistrement de client réussie",
          text: "L'enregistrement du client " + clientDTO.lastName + " " + clientDTO.firstName + " a réussie"
        }
      })
    }).catch((err: ClientRegistrationFailDTO) => {
      this.modalService.show(FailModalComponent, {
        initialState: {
          title: "Enregistrement de client échoué",
          text: "L'enregistrement du client " + clientDTO.lastName + " " + clientDTO.firstName + " a échoué. Erreur = " + err
        }
      })
    });
    this.confirmationModal?.hide();
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
