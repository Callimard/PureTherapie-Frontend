import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MeansOfPaymentDTO} from "./means-of-payment-dto";
import {GlobalVariables} from "../../../global/global-variables";
import {SimpleResponseDTO} from "../../util/simple-response-dto";
import {BillDTO} from "./bill-dto";
import {PaymentDTO} from "./payment-dto";
import {PurchaseDTO} from "./purchase-dto";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllClientPurchases(idClient: number): Promise<PurchaseDTO[]> {
    return new Promise<PurchaseDTO[]>((resolve, reject) => {
      this.httpClient.get<PurchaseDTO[]>(GlobalVariables.PURCHASES_URL + "/" + idClient).subscribe({
        next: (res) => {
          resolve(res);
        }, error: (err: HttpErrorResponse) => {
          console.error("Fail to get all client puchases, Err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public getAllClientPayments(idClient: number): Promise<PaymentDTO[]> {
    return new Promise<PaymentDTO[]>((resolve, reject) => {
      this.httpClient.get<PaymentDTO[]>(GlobalVariables.PAYMENTS_URL + "/" + idClient).subscribe({
        next: res => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all client payments, Err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public getBill(idBill: number): Promise<BillDTO> {
    return new Promise<BillDTO>(((resolve, reject) => {
      this.httpClient.get<BillDTO>(GlobalVariables.BILL_URL + "/" + idBill).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get bill, Err = ", err.error);
          reject(err.error);
        }
      })
    }));
  }

  public getAllMeansOfPayments(): Promise<MeansOfPaymentDTO[]> {
    return new Promise<MeansOfPaymentDTO[]>(((resolve, reject) => {
      this.httpClient.get<MeansOfPaymentDTO[]>(GlobalVariables.MEANS_OF_PAYMENTS_URL).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all means of payments, Err = ", err.error);
          reject(err.error);
        }
      })
    }));
  }

  public payBill(idBill: number, amountToPaid: number, idMeansOfPayment: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.post<SimpleResponseDTO>(GlobalVariables.PAY_BILL_URL + "/" + idBill
        + "?amountToPaid=" + amountToPaid + "&idMeansOfPayment=" + idMeansOfPayment, null).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to pay a Bill, Err = ", err.error);
          reject(err.error);
        }
      })
    }));
  }

  public cancelPayment(idPayment: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.delete<SimpleResponseDTO>(GlobalVariables.PAYMENTS_URL + "/" + idPayment).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to cancel payment, Err = ", err.error);
          reject(err.error);
        }
      })
    }));
  }

  public clientMakePaymentToday(idClient: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.get<boolean>(GlobalVariables.BILL_URL + "/" + idClient + GlobalVariables.CLIENT_MAKE_PAYMENT_TODAY)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to get if client make payment today, Err = ", err.error);
            reject(err.error);
          }
        })
    });
  }
}
