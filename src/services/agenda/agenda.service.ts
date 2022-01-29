import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FreeTimeSlotDTO} from "./free-time-slot-dto";
import {GlobalVariables} from "../../global/global-variables";
import {TimeSlotDTO} from "./time-slot-dto";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) {
  }

  public getFreeTimeSlots(idTechnician: number, day: string, processDuration: number): Promise<FreeTimeSlotDTO[]> {
    return new Promise<FreeTimeSlotDTO[]>(((resolve, reject) => {
      this.httpClient.get<FreeTimeSlotDTO[]>(GlobalVariables.TECHNICIAN_FREE_TIME_SLOTS_URL + "?idTechnician="
        + idTechnician + "&day=" + day + "&processDuration=" + processDuration).subscribe({
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
      this.httpClient.get<TimeSlotDTO[]>(GlobalVariables.DAY_ALL_TECHNICIAN_TIME_SLOTS_URL + "?idTechnician=" +
        idTechnician + "&date=" + day).subscribe({
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
}
