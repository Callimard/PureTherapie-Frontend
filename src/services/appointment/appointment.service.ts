import {Injectable} from '@angular/core';
import {AppointmentDTO} from "./appointment-dto";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../global/global-variables";
import {TakeAppointmentSuccessDTO} from "./take_appointment/take-appointment-success-dto";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) {
  }

  public takeAppointment(appointmentDTO: AppointmentDTO): Promise<TakeAppointmentSuccessDTO> {
    return new Promise(((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.APPOINTMENT_URL, appointmentDTO)
        .subscribe({
          next: (resp) => {
            console.log("Appointment success, ", resp);
            resolve(resp);
          },
          error: (err: HttpErrorResponse) => {
            console.log("Appointment fail, error = ", err.error);
            reject(err.error);
          }
        });
    }));
  }
}
