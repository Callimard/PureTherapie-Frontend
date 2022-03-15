import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DateTool} from "../../../../tool/date-tool";
import {ReportService} from "../../../../services/reporting/report.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {SuccessModalComponent} from "../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-create-report-modal',
  templateUrl: './create-report-modal.component.html',
  styleUrls: ['./create-report-modal.component.css']
})
export class CreateReportModalComponent implements OnInit {

  reportType: string = 'day';
  dateBegin: string = DateTool.toMySQLDateString(new Date());
  dateMonth: string = DateTool.toMySQLDateString(new Date());
  dateEnd: string = DateTool.toMySQLDateString(new Date());

  constructor(private reportService: ReportService, public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  public close() {
    this.bsRef.hide();
  }

  public dateInputType(): string {
    switch (this.reportType) {
      case 'month':
        return 'month';
      case 'custom':
      case 'year':
      case 'week':
      case 'day':
      default:
        return 'date';
    }
  }

  generateReport() {
    let observable: Observable<any> | undefined;

    switch (this.reportType) {
      case 'custom':
        observable = this.reportService.generateCustomReport(this.dateBegin, this.dateEnd);
        break;
      case 'day':
        observable = this.reportService.generateDailyReport(this.dateBegin);
        break;
      case 'week':
        observable = this.reportService.generateWeeklyReport(this.dateBegin);
        break;
      case 'month':
        observable = this.reportService.generateMonthlyReport(this.dateMonth);
        break;
      case 'year':
        observable = this.reportService.generateAnnualReport(this.dateBegin);
        break;
      default:
        console.error("Unknown report type " + this.reportType);
        break;
    }

    if (observable != undefined) {
      observable.subscribe({
        next: () => this.successGenerateReport(),
        error: (err: HttpErrorResponse) => this.failGenerateReport(err.error)
      });
    }
  }

  private successGenerateReport() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Génération de rapport";
    successModal.content.text = "La génération du rapport a réussi";
    this.bsRef.hide();

  }

  private failGenerateReport(error: any) {
    let failModalComponentBsModalRef: BsModalRef = this.modalService.show(FailModalComponent);
    failModalComponentBsModalRef.content.title = "Génération de rapport";
    failModalComponentBsModalRef.content.text = "La génération du rapport a échoué, Err = " + error;
  }

}
