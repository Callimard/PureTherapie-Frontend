import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ClientDTO} from "./client-dto";
import {GlobalVariables} from "../../../global/global-variables";
import {SimpleClientInfoDTO} from "./simple-client-info-dto";
import {ClientAbsenceDelayDTO} from "./client-absence-delay-dto";
import {ClientBasicAppointmentDTO} from "./client-basic-appointment-dto";
import {ClientRemainingStockPayDTO} from "./client-remaining-stock-pay-dto";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {
  }

  public getClientCardsPath(idClient: number): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.httpClient.get<string[]>(GlobalVariables.CLIENTS_URL + "/" + idClient + GlobalVariables.CLIENT_CARDS)
        .subscribe({
          next: (res) => {
            resolve(res);
          }, error: (err: HttpErrorResponse) => {
            console.error("Fail to get client cards path, Err = ", err.error);
            reject(err.error);
          }
        })
    })
  }

  public uploadsClientCard(idClient: number, formData: FormData): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post(GlobalVariables.CLIENTS_URL + "/" + idClient + GlobalVariables.CLIENT_CARDS, formData)
        .subscribe({
          next: (res) => {
            resolve(res);
          }, error: (err: HttpErrorResponse) => {
            console.error("Fail to upload client card, Err = ", err.error);
            reject(err.error);
          }
        });
    });
  }

  public getClientRemainingStockAndPay(idClient: number): Promise<ClientRemainingStockPayDTO> {
    return new Promise<ClientRemainingStockPayDTO>((resolve, reject) => {
      this.httpClient.get<ClientRemainingStockPayDTO>(GlobalVariables.CLIENTS_URL +
        "/" + idClient + GlobalVariables.CLIENT_REMAINING_STOCKS_PAY).subscribe({
        next: (res) => {
          resolve(res);
        }, error: (err: HttpErrorResponse) => {
          console.error("Fail to get client remaining stock and pay, Err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public getClientBasicAppointments(idClient: number): Promise<ClientBasicAppointmentDTO> {
    return new Promise<ClientBasicAppointmentDTO>((resolve, reject) => {
      this.httpClient.get<ClientBasicAppointmentDTO>(GlobalVariables.CLIENTS_URL +
        "/" + idClient + GlobalVariables.CLIENT_BASIC_APPOINTMENTS).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get client basic appointments, Err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public getClientAbsencesDelays(idClient: number): Promise<ClientAbsenceDelayDTO> {
    return new Promise<ClientAbsenceDelayDTO>((resolve, reject) => {
      this.httpClient.get<ClientAbsenceDelayDTO>(GlobalVariables.CLIENTS_URL +
        "/" + idClient + GlobalVariables.CLIENT_ABSENCES_DELAYS).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get client absences and delays, Err = ", err.error);
          reject(err.error);
        }
      })
    });
  }

  public isNewClient(idClient: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.get<boolean>(GlobalVariables.CLIENT_IS_NEW + "?idClient=" + idClient).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to no if the client is new, Err = ", err.error);
          reject(err.error);
        }
      });
    });
  }

  /**
   * NO +33 for the phone just 06 00 00 00 00
   *
   * @param clientDTO
   */
  public updateClient(clientDTO: ClientDTO): Promise<ClientDTO> {
    let client = ClientDTO.formatForSend(clientDTO);
    return new Promise<ClientDTO>((resolve, reject) => {
      this.httpClient.post<ClientDTO>(GlobalVariables.CLIENTS_URL + "/" + client.idPerson, client).subscribe({
        next: (clientResp) => {
          resolve(clientResp);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Fail to update client, error = ", error.error);
          reject(error.error);
        }
      })
    });
  }

  public searchClientWithEmail(clientEmail: string): Promise<SimpleClientInfoDTO> {
    return new Promise<SimpleClientInfoDTO>((resolve, reject) => {
      this.httpClient.get<SimpleClientInfoDTO>(GlobalVariables.CLIENTS_GET_WITH_EMAIL_URL + "?email=" + clientEmail)
        .subscribe({
          next: (client) => {
            resolve(client);
          },
          error: (error: HttpErrorResponse) => {
            console.error("Fail to find client by email, ", error.error);
            reject(error.error);
          }
        })
    });
  }

  public searchClientWithPhone(clientPhone: string): Promise<SimpleClientInfoDTO> {
    return new Promise<SimpleClientInfoDTO>((resolve, reject) => {
      this.httpClient.get<SimpleClientInfoDTO>(GlobalVariables.CLIENT_GET_WITH_PHONE_URL + "?phone=33" + clientPhone.slice(1))
        .subscribe({
          next: (client) => {
            resolve(client);
          },
          error: (error: HttpErrorResponse) => {
            console.error("Fail to find client by email, ", error.error);
            reject(error.error);
          }
        })
    })
  }

  public searchClientsWithFilter(page?: number, lastName?: string, firstName?: string, email?: string, phone?: string): Promise<ClientDTO[]> {
    return new Promise<ClientDTO[]>((resolve, reject) => {
      this.httpClient.get<ClientDTO[]>(GlobalVariables.CLIENTS_URL
        + (page != null ? "?page=" + (page - 1) + "&" : "?")
        + "filter="
        + "lastName=" + (lastName ? lastName : '') + "+"
        + "firstName=" + (firstName ? firstName : '') + "+"
        + "email=" + (email ? email : '') + "+"
        + "phone=" + (phone ? '33' + phone.slice(1) : '')).subscribe({
        next: (clients) => {
          resolve(clients);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Fail to search client with filter", error.error);
          reject(error.error);
        }
      });
    });
  }
}
