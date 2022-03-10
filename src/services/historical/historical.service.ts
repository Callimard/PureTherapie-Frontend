import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HistoricalViewDto} from "./historical-view-dto";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {

  constructor(private httpClient: HttpClient) {
    // Normal
  }

  public getUserHistorical(filter?: number): Promise<HistoricalViewDto[]> {
    return new Promise<HistoricalViewDto[]>((resolve, reject) => {
      this.httpClient.get<HistoricalViewDto[]>(GlobalVariables.HISTORICAL_URL
        + (filter != null ? '?filter=' + filter : '')).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get user historical, Err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public setHistoricalViewed(idHistoricalView: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.put(GlobalVariables.HISTORICAL_URL
        + "/" + idHistoricalView + GlobalVariables.HISTORICAL_SET_VIEWED, null)
        .subscribe({
          next: () => {
            resolve(true);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to set historical viewed, Err = ", err.error);
            reject(err.error);
          }
        })
    });
  }

}
