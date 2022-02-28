import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SurbookingDTO} from "../../../../services/appointment/dto/surbooking-dto";
import {PersonDTO} from "../../../../services/person/person-dto";
import {PersonTool} from "../../../../tool/person-tool";
import {CreateSurbookingModalComponent} from "./create-surbooking-modal/create-surbooking-modal.component";

@Component({
  selector: 'app-surbooking-modal',
  templateUrl: './surbooking-modal.component.html',
  styleUrls: ['./surbooking-modal.component.css']
})
export class SurbookingModalComponent implements OnInit {

  day: string = "1996-01-01";

  surbookings: SurbookingDTO[] = [];

  constructor(public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.surbookings.push(SurbookingDTO.default());
    }
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
  }

}
