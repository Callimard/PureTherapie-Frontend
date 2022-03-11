import {Component, OnInit} from '@angular/core';
import {KPIService} from "../../../services/kpi/kpi.service";
import {TurnoverKPIRes} from "../../../services/kpi/turnorver/turnover-kpires";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  turnoverKPI?: TurnoverKPIRes;

  constructor(private kpiService: KPIService) {
    // Normal
  }

  ngOnInit(): void {
    this.kpiService.executeKpi(KPIService.TURNOVER_KPI, "2022-03-11", "2022-03-11").subscribe({
      next: (res) => {
        this.turnoverKPI = res;
      },
      error: (err: HttpErrorResponse) => console.error("Err = ", err.error)
    })
  }

}
