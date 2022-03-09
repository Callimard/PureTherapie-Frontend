import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../services/person/technician/dto/technician-dto";
import {TechnicianAbsenceDTO} from "../../../services/person/technician/dto/technician-absence-dto";
import {PersonDTO} from "../../../services/person/person-dto";
import {PersonTool} from "../../../tool/person-tool";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {Rechargeable} from "../../../tool/rechargeable";
import {BsModalService} from "ngx-bootstrap/modal";
import {
  CreateTechnicianAbsenceModalComponent
} from "./create-technician-absence-modal/create-technician-absence-modal.component";
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
  selector: 'app-technician-management',
  templateUrl: './technician-management.component.html',
  styleUrls: ['./technician-management.component.css'],
  host: {'class': 'technician-management'}
})
export class TechnicianManagementComponent implements OnInit, Rechargeable {

  selectedTech?: TechnicianDTO;
  selectedTechAbsences: TechnicianAbsenceDTO[] = [];

  activeTechnicians: TechnicianDTO[] = [];
  inactiveTechnicians: TechnicianDTO[] = [];

  constructor(private technicianService: TechnicianService, private authService: AuthenticationService,
              private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.recharge();
    this.authService.checkLogin();
  }

  recharge(): void {
    this.chargeActiveTechnicians();
    this.chargeInactivateTechnicians();
    this.chargeTechAbsence();
  }

  chargeActiveTechnicians() {
    this.technicianService.getAllTechnicians(true).then((res) => this.activeTechnicians = res);
  }

  chargeInactivateTechnicians() {
    this.technicianService.getAllTechnicians(false).then((res) => this.inactiveTechnicians = res);
  }

  chargeTechAbsence() {
    if (this.selectedTech != null)
      this.displayTechAbsences(this.selectedTech);
  }

  simplePersonIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

  activateTech(tech: TechnicianDTO) {
    this.technicianService.activateTechnician(tech.idPerson).then(() => {
      this.recharge();
    });
  }

  deactivateTech(tech: TechnicianDTO) {
    this.technicianService.deactivateTechnician(tech.idPerson).then(() => {
      this.recharge();
    });
  }

  displayTechAbsences(tech: TechnicianDTO) {
    this.technicianService.getTechnicianAbsences(tech.idPerson).then((res) => {
      this.selectedTech = tech;
      this.selectedTechAbsences = [];
      this.selectedTechAbsences = res;
    });
  }

  addTechAbsence() {
    this.modalService.show(CreateTechnicianAbsenceModalComponent, {
      initialState: {
        technician: this.selectedTech,
        rechargeable: this
      }
    });
  }

  deleteTechAbsence(techAbsence: TechnicianAbsenceDTO) {
    this.technicianService.deleteTechnicianAbsence(techAbsence.idTechnicianAbsence).then(() => this.recharge());
  }
}
