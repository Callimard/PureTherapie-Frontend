import {Injectable} from '@angular/core';
import {TakeAppointmentDTO} from "./take_appointment/take-appointment-dto";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../global/global-variables";
import {TakeAppointmentSuccessDTO} from "./take_appointment/take-appointment-success-dto";
import {SimpleResponseDTO} from "../util/simple-response-dto";
import {AppointmentDTO} from "./appointment-dto";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) {
  }

  public isFirstAppointment(idAppointment: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.get<boolean>(GlobalVariables.APPOINTMENTS_URL + "/" + idAppointment
        + GlobalVariables.IS_FIRST_APPOINTMENT).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to know if the appointment is first, Err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public getAppointment(idAppointment: number): Promise<AppointmentDTO> {
    return new Promise<AppointmentDTO>((resolve, reject) => {
      this.httpClient.get<AppointmentDTO>(GlobalVariables.APPOINTMENTS_URL + "/" + idAppointment).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get appointment, err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public takeAppointment(appointmentDTO: TakeAppointmentDTO): Promise<TakeAppointmentSuccessDTO> {
    return new Promise<TakeAppointmentSuccessDTO>(((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.APPOINTMENTS_URL, appointmentDTO)
        .subscribe({
          next: (resp) => {
            resolve(resp);
          },
          error: (err: HttpErrorResponse) => {
            console.log("Appointment fail, error = ", err.error);
            reject(err.error);
          }
        });
    }));
  }

  public cancelAppointment(idAppointment: number): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.httpClient.post<SimpleResponseDTO>(GlobalVariables.APPOINTMENTS_CANCELLATION_URL + "?idAppointment=" + idAppointment, null).subscribe({
        next: (res) => {
          resolve(res.message)
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to cancel appointment, Err = ", err.error);
          reject(err.error);
        }
      })
    }))
  }

  public getClientAppointment(idClient: number, day: string): Promise<AppointmentDTO> {
    return new Promise<AppointmentDTO>(((resolve, reject) => {
      this.httpClient.get<AppointmentDTO>(GlobalVariables.CLIENT_APPOINTMENT_URL + "/" + idClient + "?day=" + day).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get client appointment, Err = ", err.error);
          reject(err.error);
        }
      });
    }));
  }

  public clientArrival(idClient: number, idAppointment: number): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.httpClient.post(GlobalVariables.CLIENT_ARRIVAL_URL
        + "?idClient=" + idClient
        + "&idAppointment=" + idAppointment, null).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to client arrival, Err = ", err.error);
          reject(err.error);
        }
      })
    }))
  }

  public provisionClientWithAppointment(idClient: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.post<SimpleResponseDTO>(GlobalVariables.PROVISION_CLIENT_WITH_APPOINTMENT_URL + "?idClient=" + idClient, null)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to provision client with appointment, Err = ", err.error);
            reject(err.error);
          }
        });
    }));
  }

  public provisionClientWithoutAppointment(idClient: number, idTechnician: number, idAestheticCare: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.post<SimpleResponseDTO>(GlobalVariables.PROVISION_CLIENT_WITHOUT_APPOINTMENT_URL
        + "?idClient=" + idClient + "&idTechnician=" + idTechnician + "&idAestheticCare=" + idAestheticCare, null)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to provision client without appointment, Err = ", err.error);
            reject(err.error);
          }
        });
    }));
  }

  public finalizeAppointment(idAppointment: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>((resolve, reject) => {
      this.httpClient.put<SimpleResponseDTO>(GlobalVariables.FINALIZE_APPOINTMENT_URL + "/" + idAppointment, null)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (error: HttpErrorResponse) => {
            console.error("Fail to finalize appointment, Err = ", error.error);
            reject(error.error);
          }
        })
    });
  }
}
