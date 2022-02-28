import {Injectable} from '@angular/core';
import {AestheticCareDTO} from "./dto/aesthetic-care-dto";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../../../global/global-variables";
import {SimpleResponseDTO} from "../../../util/simple-response-dto";
import {SessionPurchaseDTO} from "./dto/session-purchase-dto";
import {AestheticCareProvisionDTO} from "./dto/aesthetic-care-provision-dto";
import {AestheticCareCreationParameter} from "./parameter/aesthetic-care-creation-parameter";

@Injectable({
  providedIn: 'root'
})
export class AestheticCareService {

  constructor(private httpClient: HttpClient) {
  }

  public createAC(acName: string, acPrice: number, acDuration: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.AESTHETIC_CARES_URL,
        new AestheticCareCreationParameter(acName, acPrice, acDuration)).subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to create a new ac, Err = ", err.error);
          reject(err.error);
        }
      });
    });
  }

  public updateAC(idAC: number, acName: string, acPrice: number, acDuration: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.put<any>(GlobalVariables.AESTHETIC_CARES_URL + '/' + idAC,
        new AestheticCareCreationParameter(acName, acPrice, acDuration)).subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => {
          console.error("Fail to update a new ac, Err = ", err.error);
          reject(err.error);
        }
      });
    });
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

  public getClientACPurchase(idSessionPurchase: number): Promise<SessionPurchaseDTO> {
    return new Promise<SessionPurchaseDTO>((resolve, reject) => {
      this.httpClient.get<SessionPurchaseDTO>(GlobalVariables.CLIENT_ALL_SESSION_PURCHASES_URL + "/" + idSessionPurchase)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to get client session purchase, Err = ", err.error);
            reject(err.error);
          }
        })
    })
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
