import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FreeTimeSlotDTO} from "./free-time-slot-dto";
import {GlobalVariables} from "../../global/global-variables";
import {TimeSlotDTO} from "./time-slot-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) {
    // Normal
  }

  public isOpenDay(day: string): Observable<boolean> {
    return this.httpClient.get<boolean>(GlobalVariables.IS_OPEN_DAY + "?day=" + day);
  }

  public getFreeTimeSlots(idTechnician: number, day: string, processDuration: number): Promise<FreeTimeSlotDTO[]> {
    return new Promise<FreeTimeSlotDTO[]>(((resolve, reject) => {
      this.httpClient.get<FreeTimeSlotDTO[]>(GlobalVariables.AGENDA_TECHNICIANS_URL
        + "/" + idTechnician + GlobalVariables.AGENDA_FREE_TS
        + "?day=" + day + "&processDuration=" + processDuration)
        .subscribe({
          next: (freeTimeSlots) => {
            resolve(freeTimeSlots);
          },
          error: (error: HttpErrorResponse) => {
            console.error("Fail to charge free time slots, error = ", error.error);
            reject(error.error);
          }
        });
    }));
  }

  public getAllTimeSlotsOfTechnician(idTechnician: number, day: string): Promise<TimeSlotDTO[]> {
    return new Promise<TimeSlotDTO[]>(((resolve, reject) => {
      this.httpClient.get<TimeSlotDTO[]>(GlobalVariables.AGENDA_TECHNICIANS_URL
        + "/" + idTechnician + GlobalVariables.AGENDA_TS + "?date=" + day).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all technician TS of the day, Error = ", err);
          reject(err.error);
        }
      });
    }));
  }

  public getAllTimeSlotsOfDay(day: string): Promise<TimeSlotDTO[]> {
    return new Promise<TimeSlotDTO[]>((resolve, reject) => {
      this.httpClient.get<TimeSlotDTO[]>(GlobalVariables.AGENDA_TS_URL + "?date=" + day).subscribe({
        next: res => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all TS of the day, Error = ", err);
          reject(err.error);
        }
      })
    })
  }

  public getAllDayTechnicianTimeSlot(date: string): Promise<TimeSlotDTO[]> {
    return new Promise<TimeSlotDTO[]>((resolve, reject) => {
      this.httpClient.get<TimeSlotDTO[]>(GlobalVariables.AGENDA_TECHNICIANS_URL
        + GlobalVariables.AGENDA_TS + "?date=" + date)
        .subscribe({
          next: res => resolve(res),
          error: (err: HttpErrorResponse) => {
            console.error("Fail to get all day technician TS, Error = ", err);
            reject(err.error);
          }
        })
    })
  }
}
