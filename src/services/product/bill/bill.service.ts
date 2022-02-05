import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MeansOfPaymentDTO} from "./means-of-payment-dto";
import {GlobalVariables} from "../../../global/global-variables";
import {SimpleResponseDTO} from "../../util/simple-response-dto";
import {BillDTO} from "./bill-dto";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) {
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

  public alreadyPayAmount(bill: BillDTO): number {
    let amountAlreadyPaid = 0.0;
    for (let payment of bill.payments) {
      if (!payment.canceled)
        amountAlreadyPaid += payment.amountPaid;
    }
    return amountAlreadyPaid;
  }
}
