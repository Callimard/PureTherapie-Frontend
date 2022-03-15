import { Component, OnInit } from '@angular/core';
import {KPIService} from "../../../services/kpi/kpi.service";
import {KpiDTO} from "../../../services/kpi/kpi-dto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {'class': 'dashboard'}
})
export class DashboardComponent implements OnInit {

  allKPIs: KpiDTO[] = [];

  constructor(private kpiService: KPIService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeKPIs();
  }

  private chargeKPIs() {
    this.kpiService.getAllKpis().subscribe({
      next: (res) => this.allKPIs = res,
      error: (err: HttpErrorResponse) => console.error("Fail charge all KPIs, Err = ", err.error)
    })
  }

}
