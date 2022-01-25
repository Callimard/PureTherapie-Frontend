import {Injectable} from '@angular/core';
import {AestheticCareDTO} from "./aesthetic-care-dto";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../../../global/global-variables";
import {SimpleResponseDTO} from "../../../util/simple-response-dto";

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
          resolve(aestheticCares);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Fail to get all ACs, error = ", error.error);
          reject(error.error);
        }
      });
    }));
  }

  public purchaseAestheticCare(idAc: number, idClient: number, customPrice?: number, idPaymentType?: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.post<SimpleResponseDTO>(GlobalVariables.AESTHETIC_CARES_URL + "/" + idAc
        + GlobalVariables.AESTHETIC_CARE_PURCHASE + "?idClient=" + idClient
        + (customPrice ? ("&customPrice=" + customPrice) : '')
        + (idPaymentType ? ("&idPaymentType=" + idPaymentType) : ''), {})
        .subscribe({
          next: (resp) => {
            resolve(resp);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to purchase AC. Error = ", err.error);
            reject(err);
          }
        });
    }));
  }
}
