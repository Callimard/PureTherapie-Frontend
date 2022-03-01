import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from "../../../services/person/technician/dto/technician-dto";
import {TechnicianAbsenceDTO} from "../../../services/person/technician/dto/technician-absence-dto";
import {PersonDTO} from "../../../services/person/person-dto";
import {PersonTool} from "../../../tool/person-tool";
import {TechnicianService} from "../../../services/person/technician/technician.service";
import {Rechargeable} from "../../../tool/rechargeable";

@Component({
  selector: 'app-technician-management',
  templateUrl: './technician-management.component.html',
  styleUrls: ['./technician-management.component.css'],
  host: {'class': 'technician-management'}
})
export class TechnicianManagementComponent implements OnInit, Rechargeable {

  selectedTech: TechnicianDTO = TechnicianDTO.default();
  selectedTechAbsences: TechnicianAbsenceDTO[] = [];

  activeTechnicians: TechnicianDTO[] = [];
  inactiveTechnicians: TechnicianDTO[] = [];

  constructor(private technicianService: TechnicianService) {
    // Normal
  }

  ngOnInit(): void {
    this.recharge();
  }

  recharge(): void {
    this.chargeActiveTechnicians();
    this.chargeInactivateTechnicians();
  }

  chargeActiveTechnicians() {
    this.technicianService.getAllTechnicians(true).then((res) => this.activeTechnicians = res);
  }

  chargeInactivateTechnicians() {
    this.technicianService.getAllTechnicians(false).then((res) => this.inactiveTechnicians = res);
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

}
