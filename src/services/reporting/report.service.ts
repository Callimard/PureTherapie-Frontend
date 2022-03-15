import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportDTO} from "./report-dto";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) {
    // Normal
  }

  public getReport(reportTypeName: string, page: number): Observable<ReportDTO[]> {
    return this.httpClient.get<ReportDTO[]>(GlobalVariables.REPORTS_URL + "?reportTypeName=" + reportTypeName + "&page=" + page);
  }

  public generateCustomReport(dateBegin: string, dateEnd: string): Observable<any> {
    return this.httpClient.post<any>(GlobalVariables.CUSTOM_REPORT_URL + "?begin=" + dateBegin + "&end=" + dateEnd, null);
  }

  public generateDailyReport(day: string): Observable<any> {
    return this.httpClient.post<any>(GlobalVariables.DAILY_REPORT_URL + "?day=" + day, null);
  }

  public generateWeeklyReport(oneDayOfWeek: string): Observable<any> {
    return this.httpClient.post<any>(GlobalVariables.WEEKLY_REPORT_URL + "?oneDayOfWeek=" + oneDayOfWeek, null);
  }

  public generateMonthlyReport(monthDate: string): Observable<any> {
    return this.httpClient.post<any>(GlobalVariables.MONTHLY_REPORT_URL + "?monthDate=" + monthDate, null);
  }

  public generateAnnualReport(oneDayOfYear: string): Observable<any> {
    return this.httpClient.post<any>(GlobalVariables.ANNUAL_REPORT_URL + "?oneDayOfYear=" + oneDayOfYear, null);
  }
}
