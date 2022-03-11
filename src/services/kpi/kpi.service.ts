import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {KPIRes} from "./kpires";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class KPIService {

  constructor(private httpClient: HttpClient) {
    // Normal
  }

  public executeKpi(kpiName: string, beginDate: string, endDate: string): Observable<KPIRes> {
    return this.httpClient.get<KPIRes>(GlobalVariables.KPIS_URL + "/" + kpiName
      + "?begin=" + beginDate + "&end=" + endDate);
  }

  // KPIs name.

  public static readonly TURNOVER_KPI = "TurnoverKPI";
}
