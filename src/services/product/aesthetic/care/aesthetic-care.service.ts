import {Injectable} from '@angular/core';
import {AestheticCareDTO} from "./aesthetic-care-dto";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../../../global/global-variables";
import {SimpleResponseDTO} from "../../../util/simple-response-dto";
import {SessionPurchaseDTO} from "./session-purchase-dto";
import {AestheticCareProvisionDTO} from "./aesthetic-care-provision-dto";

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

  public getAllClientACPurchases(idClient: number): Promise<SessionPurchaseDTO[]> {
    return new Promise<SessionPurchaseDTO[]>(((resolve, reject) => {
      this.httpClient.get<SessionPurchaseDTO[]>(GlobalVariables.CLIENT_ALL_SESSION_PURCHASES_URL + "?idClient=" + idClient)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to get all client ac purchases");
            reject(err.error);
          }
        })

    }))
  }

  public getACProvisionForAppointment(idAppointment: number): Promise<AestheticCareProvisionDTO> {
    return new Promise<AestheticCareProvisionDTO>(((resolve, reject) => {
      this.httpClient.get<AestheticCareProvisionDTO>(GlobalVariables.AESTHETIC_CARE_PROVISIONS_BY_APPOINTMENT
        + "/" + idAppointment).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get ac provision for appointment, Err = ", err.error);
          reject(err.error);
        }
      })
    }));
  }

  public getAllUnpaidACPurchases(idClient: number): Promise<SessionPurchaseDTO[]> {
    return new Promise<SessionPurchaseDTO[]>(((resolve, reject) => {
      this.httpClient.get<SessionPurchaseDTO[]>(GlobalVariables.UNPAID_AESTHETIC_CARE_PURCHASES
        + "?idClient=" + idClient).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("fail to get all ac purchase unpaid. Err = ", err.error);
          reject(err.error);
        }
      })
    }))
  }

  public getClientStockOfAC(idClient: number, idAC: number): Promise<number> {
    return new Promise(((resolve, reject) => {
      this.httpClient.get<number>(GlobalVariables.AESTHETIC_CARES_URL
        + "/" + idClient + GlobalVariables.CLIENT_AC_STOCK + "/" + idAC).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all client ac stock, Err = ", err.error);
          reject(err.error);
        }
      })
    }))
  }
}
