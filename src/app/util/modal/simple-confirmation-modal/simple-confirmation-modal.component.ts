import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-simple-confirmation-modal',
  templateUrl: './simple-confirmation-modal.component.html',
  styleUrls: ['./simple-confirmation-modal.component.css']
})
export class SimpleConfirmationModalComponent implements OnInit {

  title: string = "";
  text: string = "";
  parent?: BsModalRef;
  confirmationFunction: () => void = () => {
    console.log("Nothing to do while confirmation")
  };

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  close() {
    this.bsModalRef.hide();
  }

  confirmation() {
    this.confirmationFunction();
    this.parent?.hide();
    this.bsModalRef.hide();
  }

}
