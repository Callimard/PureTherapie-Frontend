import {Injectable} from '@angular/core';
import {AestheticCareDTO} from "./aesthetic-care-dto";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class AestheticCareService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllAestheticCare(): Promise<AestheticCareDTO[]> {
    return new Promise<AestheticCareDTO[]>(((resolve, reject) => {
      this.httpClient.get<AestheticCareDTO[]>(GlobalVariables.AESTHETIC_CARES_URL).subscribe({
        next: (aestheticCares) => {
          console.log("Receive ACs, ", aestheticCares);
          resolve(aestheticCares);
        },
        error: (error: HttpErrorResponse) => {
          console.log("Fail to charge ACs, error = ", error.error);
          reject(error.error);
        }
      });
    }));
  }
}
