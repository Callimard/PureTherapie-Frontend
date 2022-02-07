import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalOpeningTimeDTO} from "./global-opening-time-dto";
import {GlobalVariables} from "../../global/global-variables";
import {ExceptionalOpeningDTO} from "./exceptional-opening-dto";
import {ExceptionalCloseDTO} from "./exceptional-close-dto";

@Injectable({
  providedIn: 'root'
})
export class OpeningAndCloseService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllGlobalOpeningTimes(): Promise<GlobalOpeningTimeDTO[]> {
    return new Promise<GlobalOpeningTimeDTO[]>((resolve, reject) => {
      this.httpClient.get<GlobalOpeningTimeDTO[]>(GlobalVariables.GLOBAL_OPENING_TIMES_URL).subscribe({
        next: (res) => {
          resolve(res)
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all globals openings, Err = ", err.error);
          reject(err.error);
        }
      });
    });
  }

  public getAllExceptionalOpenings(): Promise<ExceptionalOpeningDTO[]> {
    return new Promise<ExceptionalOpeningDTO[]>((resolve, reject) => {
      this.httpClient.get<ExceptionalOpeningDTO[]>(GlobalVariables.EXCEPTIONAL_OPENINGS_URL).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all exceptional openings, Err = ", err.error);
          reject(err.error);
        }
      });
    });
  }

  public getAllExceptionalClosings(): Promise<ExceptionalCloseDTO[]> {
    return new Promise<ExceptionalCloseDTO[]>((resolve, reject) => {
      this.httpClient.get<ExceptionalCloseDTO[]>(GlobalVariables.EXCEPTIONAL_CLOSING_URL).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all exceptional closings, Err = ", err.error);
          reject(err.error);
        }
      })
    });
  }
}
