import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TechnicianDTO} from "./dto/technician-dto";
import {GlobalVariables} from "../../../global/global-variables";
import {TechnicianAbsenceDTO} from "./dto/technician-absence-dto";
import {TechnicianAbsenceCreationParameter} from "./parameter/technician-absence-creation-parameter";

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private httpClient: HttpClient) {
  }

  public addTechnicianAbsence(idTechnician: number, day: string, beginTime: string, endTime: string): Promise<any> {
    let parameter: TechnicianAbsenceCreationParameter = new TechnicianAbsenceCreationParameter(idTechnician, day, beginTime, endTime);
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.TECHNICIANS_URL
        + "/" + idTechnician + "/absences", parameter).subscribe({
        next: (res) => resolve(res),
        error: (error: HttpErrorResponse) => {
          console.error("Fail to add Technician absence, error = ", error.error);
          reject(error.error)
        }
      })
    })
  }

  public deleteTechnicianAbsence(idTechAbsence: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.delete(GlobalVariables.TECHNICIAN_ABSENCES_URL + "/" + idTechAbsence).subscribe({
        next: (res) => resolve(res),
        error: (error: HttpErrorResponse) => {
          console.error("Fail to delete Technician absence, error = ", error.error);
          reject(error.error)
        }
      })
    })
  }

  public getAllTechnicians(active: boolean = true): Promise<TechnicianDTO[]> {
    return new Promise<TechnicianDTO[]>(((resolve, reject) => {
      this.httpClient.get<TechnicianDTO[]>(GlobalVariables.TECHNICIANS_URL + "?active=" + active).subscribe({
        next: (technicians) => {
          resolve(technicians);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Fail to charge Technicians, error = ", error.error);
          reject(error.error)
        }
      });
    }));
  }

  public deactivateTechnician(idTechnician: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.delete<any>(GlobalVariables.TECHNICIANS_URL + "/" + idTechnician).subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to deactivate technician, error = ", err.error);
          reject(err.error);
        }
      });
    });
  }

  public activateTechnician(idTechnician: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.TECHNICIANS_URL + "/" + idTechnician + "/activate", null)
        .subscribe({
          next: (res) => resolve(res),
          error: (err: HttpErrorResponse) => {
            console.error("Fail to activate technician, error = ", err.error);
            reject(err.error);
          }
        });
    });
  }

  public getTechnicianAbsences(idTechnician: number): Promise<TechnicianAbsenceDTO[]> {
    return new Promise<TechnicianAbsenceDTO[]>((resolve, reject) => {
      this.httpClient.get<TechnicianAbsenceDTO[]>(GlobalVariables.TECHNICIANS_URL
        + "/" + idTechnician + "/absences").subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get absences of technician, error = ", err.error);
          reject(err.error);
        }
      })
    })
  }
}
