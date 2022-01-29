import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-fail-modal',
  templateUrl: './fail-modal.component.html',
  styleUrls: ['./fail-modal.component.css']
})
export class FailModalComponent implements OnInit {

  title?: string;
  text?: string;
  parent?: BsModalRef;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.parent?.hide();
    this.bsModalRef.hide();
  }

}
