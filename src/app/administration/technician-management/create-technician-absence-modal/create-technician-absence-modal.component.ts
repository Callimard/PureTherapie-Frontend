import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../../services/person/technician/dto/technician-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PersonDTO} from "../../../../services/person/person-dto";
import {PersonTool} from "../../../../tool/person-tool";
import {DateTool} from "../../../../tool/date-tool";
import {TechnicianService} from "../../../../services/person/technician/technician.service";
import {
  SimpleConfirmationModalComponent
} from "../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {Rechargeable} from "../../../../tool/rechargeable";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-create-technician-absence-modal',
  templateUrl: './create-technician-absence-modal.component.html',
  styleUrls: ['./create-technician-absence-modal.component.css']
})
export class CreateTechnicianAbsenceModalComponent implements OnInit {

  technician: TechnicianDTO = TechnicianDTO.default();

  selectedDay: string = DateTool.toMySQLDateString(new Date());
  selectedBeginTime: string = "09:00";
  selectedEndTime: string = "21:00";

  rechargeable?: Rechargeable;

  constructor(private technicianService: TechnicianService,
              public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  close() {
    this.bsRef.hide();
  }

  simplePersonIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

  confirmAddTechnicianAbsence() {
    let confirmModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmModal.content.title = "Confirmation d'ajout d'absence";
    confirmModal.content.text = "Êtes-vous sûr de vouloir ajouter une absence pour " + this.simplePersonIdentifier(this.technician);
    confirmModal.content.confirmation = () => this.addTechnicianAbsence();
  }

  private addTechnicianAbsence() {
    this.technicianService.addTechnicianAbsence(this.technician.idPerson, this.selectedDay, this.selectedBeginTime,
      this.selectedEndTime).then(() => {
      this.successCreateTechAbsence();
    }).catch((err) => {
      this.failCreateTechAbsence(err);
    })
  }

  private successCreateTechAbsence() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Ajout d'absence réussi";
    successModal.content.text = "L'ajout de l'absence technicienne a reussie";
    this.rechargeable?.recharge();
  }

  private failCreateTechAbsence(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Ajout d'absence échoué";
    failModal.content.text = "L'ajout de l'absence technicienne n'a pas réussie, Err = " + err;
  }
}
