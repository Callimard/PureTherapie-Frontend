import {Component, OnInit} from '@angular/core';
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/dto/aesthetic-care-dto";
import {AestheticCareService} from "../../../../services/product/aesthetic/care/aesthetic-care.service";
import {Rechargeable} from "../../../../tool/rechargeable";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CreateAestheticCareModalComponent} from "./create-aesthetic-care-modal/create-aesthetic-care-modal.component";

@Component({
  selector: 'app-aesthetic-care-management',
  templateUrl: './aesthetic-care-management.component.html',
  styleUrls: ['./aesthetic-care-management.component.css'],
  host: {'class': 'aesthetic-care-management'}
})
export class AestheticCareManagementComponent implements OnInit, Rechargeable {

  acs: AestheticCareDTO[] = [];

  constructor(private acService: AestheticCareService, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeAllACs();
  }

  recharge(): void {
    this.chargeAllACs();
  }

  private chargeAllACs() {
    this.acService.getAllAestheticCare().then(res => this.acs = res);
  }

  createAC() {
    let modal: BsModalRef = this.modalService.show(CreateAestheticCareModalComponent);
    modal.content.rechargeable = this;
  }

  updateAC(ac: AestheticCareDTO) {
    let modal: BsModalRef = this.modalService.show(CreateAestheticCareModalComponent);
    modal.content.ac = ac;
    modal.content.updatedMode = true;
    modal.content.rechargeable = this;
  }
}
