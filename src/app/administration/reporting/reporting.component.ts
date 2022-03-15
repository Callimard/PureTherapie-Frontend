import {Component, OnInit} from '@angular/core';
import {ReportDTO} from "../../../services/reporting/report-dto";
import {ReportService} from "../../../services/reporting/report.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BsModalService} from "ngx-bootstrap/modal";
import {CreateReportModalComponent} from "./create-report-modal/create-report-modal.component";
import {GlobalVariables} from "../../../global/global-variables";
import {Rechargeable} from "../../../tool/rechargeable";

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css'],
  host: {'class': 'reporting'}
})
export class ReportingComponent implements OnInit, Rechargeable {

  mapReports: Map<string, ReportDTO[]> = new Map<string, ReportDTO[]>();

  filter: string = 'day';
  page: number = 1;

  selectedReport?: ReportDTO;

  constructor(private reportService: ReportService, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeReportForCurrentFilter();
  }

  recharge(): void {
    this.rechargeAll();
  }

  private rechargeAll() {
    let keys: IterableIterator<string> = this.mapReports.keys();
    for (let key of keys) {
      this.reportService.getReport(key, 0).subscribe({
        next: (res) => this.mapReports.set(key, res),
        error: (err: HttpErrorResponse) => console.error("Fail charge reports, Err => ", err.error)
      })
    }
  }

  public changeFilter(filter: string) {
    this.filter = filter;

    let reports: ReportDTO[] | undefined = this.mapReports.get(this.filter);
    if (!reports) {
      this.chargeReportForCurrentFilter();
    }
  }

  private chargeReportForCurrentFilter() {
    let researchFilter = this.filter;
    this.reportService.getReport(this.filter, this.page - 1).subscribe({
      next: (res) => this.mapReports.set(researchFilter, res),
      error: (err: HttpErrorResponse) => console.error("Fail charge reports, Err => ", err.error)
    });
  }

  public previousPage() {
    this.page -= 1;
    this.chargeReportForCurrentFilter();
  }

  public nextPage() {
    this.page += 1;
    this.chargeReportForCurrentFilter();
  }

  public createReport() {
    this.modalService.show(CreateReportModalComponent, {
      initialState: {
        rechargeable: this
      }
    });
  }

  backendReportUploadsUrl(): string {
    return GlobalVariables.BACK_END_URL + GlobalVariables.REPORTS_UPLOAD_URL;
  }

  selectReport(report: ReportDTO) {
    this.selectedReport = report;
  }

  executeSelectedReport() {
    if (this.selectedReport != null) {
      this.reportService.executeReport(this.selectedReport.idReport).subscribe({
        next: () => {
          console.log("Report execution success");
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail execute report, Err = ", err);
        }
      })
    }
  }
}
