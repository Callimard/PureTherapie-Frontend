import {Component, Input, OnInit} from '@angular/core';
import {KpiDTO} from "../../../../services/kpi/kpi-dto";

@Component({
  selector: 'app-kpicard',
  templateUrl: './kpicard.component.html',
  styleUrls: ['./kpicard.component.css']
})
export class KPICardComponent implements OnInit {

  @Input() kpi?: KpiDTO;

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

}
