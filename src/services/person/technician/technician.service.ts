import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TechnicianDTO} from "./dto/technician-dto";
import {GlobalVariables} from "../../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllTechnicians(active: boolean = false): Promise<TechnicianDTO[]> {
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
}
