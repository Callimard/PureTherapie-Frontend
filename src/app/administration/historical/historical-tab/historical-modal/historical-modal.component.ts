import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {HistoricalDto} from "../../../../../services/historical/historical-dto";

@Component({
  selector: 'app-historical-modal',
  templateUrl: './historical-modal.component.html',
  styleUrls: ['./historical-modal.component.css']
})
export class HistoricalModalComponent implements OnInit {

  historical: HistoricalDto = HistoricalDto.default();

  constructor(public bsModalRef: BsModalRef) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  close() {
    this.bsModalRef.hide();
  }

}
