import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FreeTimeSlotDto} from "./free-time-slot-dto";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class TechnicianAgendaService {

  constructor(private httpClient: HttpClient) {
  }

  public getFreeTimeSlots(idTechnician: number, day: string): Promise<FreeTimeSlotDto[]> {
    return new Promise<FreeTimeSlotDto[]>(((resolve, reject) => {
      this.httpClient.get<FreeTimeSlotDto[]>(GlobalVariables.TECHNICIAN_FREE_TIME_SLOTS_URL + "?idTechnician="
        + idTechnician + "&day=" + day).subscribe({
        next: (freeTimeSlots) => {
          console.log("Receive all free time slots, ", freeTimeSlots);
          resolve(freeTimeSlots);
        },
        error: (error: HttpErrorResponse) => {
          console.log("Fail to charge free time slots, error = ", error.error);
          reject(error.error);
        }
      });
    }));
  }
}
