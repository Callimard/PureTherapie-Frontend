import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {

  title?: string;
  text?: string;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  close() {
    this.bsModalRef.hide();
  }

}
