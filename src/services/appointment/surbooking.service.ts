import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SurbookingDTO} from "./dto/surbooking-dto";
import {GlobalVariables} from "../../global/global-variables";
import {CreateSurbookingParameter} from "./parameter/create-surbooking-parameter";

@Injectable({
  providedIn: 'root'
})
export class SurbookingService {

  constructor(private httpClient: HttpClient) {
    // Normal
  }

  public getAllSurbookings(day: string): Promise<SurbookingDTO[]> {
    return new Promise<SurbookingDTO[]>((resolve, reject) => {
      this.httpClient.get<SurbookingDTO[]>(GlobalVariables.SURBOOKINGS_URL + "?day=" + day).subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all surbookings of the day, Err = ", err.error);
          reject(err.error);
        }
      });
    });
  }

  public createSurbooking(idClient: number, idAC: number, day: string, time: string): Promise<any> {
    let parameter: CreateSurbookingParameter = new CreateSurbookingParameter(idClient, idAC, day, time);
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.SURBOOKINGS_URL, parameter).subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to create surbooking, Err = ", err.error);
          reject(err.error);
        }
      });
    });
  }

  public clientArrive(idSurbooking: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post(GlobalVariables.SURBOOKINGS_URL
        + "/" + idSurbooking + GlobalVariables.SURBOOKING_CLIENT_ARRIVE, null).subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to make client arrive for the surbooking, Err = ", err.error);
          reject(err.error);
        }
      })
    });
  }
}
