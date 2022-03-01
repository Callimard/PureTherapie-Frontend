import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SurbookingDTO} from "../../../../services/appointment/dto/surbooking-dto";
import {PersonDTO} from "../../../../services/person/person-dto";
import {PersonTool} from "../../../../tool/person-tool";
import {CreateSurbookingModalComponent} from "./create-surbooking-modal/create-surbooking-modal.component";
import {SurbookingService} from "../../../../services/appointment/surbooking.service";
import {Rechargeable} from "../../../../tool/rechargeable";
import {SurbookingSummaryComponent} from "./surbooking-summary/surbooking-summary.component";

@Component({
  selector: 'app-surbooking-modal',
  templateUrl: './surbooking-modal.component.html',
  styleUrls: ['./surbooking-modal.component.css']
})
export class SurbookingModalComponent implements OnInit, Rechargeable {

  day: string = "";

  surbookings: SurbookingDTO[] = [];

  constructor(private surbookingService: SurbookingService,
              public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.recharge();
  }

  recharge(): void {
    this.chargeAllSurbookings();
  }

  private chargeAllSurbookings() {
    this.surbookingService.getAllSurbookings(this.day).then((res) => {
      this.surbookings = res;
    })
  }

  close() {
    this.bsRef.hide();
  }

  simplePersonIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

  createSurbooking() {
    let createSurbookingModal: BsModalRef = this.modalService.show(CreateSurbookingModalComponent, {
      class: 'medium-modal'
    });
    createSurbookingModal.content.selectedDay = this.day;
    createSurbookingModal.content.rechargeable = this;
  }

  surbookingSummary(surbooking: SurbookingDTO) {
    this.modalService.show(SurbookingSummaryComponent, {
      initialState: {
        surbooking: surbooking
      }
    });
  }
}
