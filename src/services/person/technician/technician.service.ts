import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TechnicianDTO} from "./technician-dto";
import {GlobalVariables} from "../../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllTechnicians(alsoInactivated: boolean = false): Promise<TechnicianDTO[]> {
    return new Promise<TechnicianDTO[]>(((resolve, reject) => {
      this.httpClient.get<TechnicianDTO[]>(GlobalVariables.TECHNICIANS_URL + "?alsoInactivated=" + alsoInactivated).subscribe({
        next: (technicians) => {
          console.log("Receive technicians, ", technicians);
          resolve(technicians);
        },
        error: (error: HttpErrorResponse) => {
          console.log("Fail to charge Technicians, error = ", error.error);
          reject(error.error)
        }
      });
    }));
  }
}
