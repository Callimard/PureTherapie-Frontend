import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ClientDTO} from "./client-dto";
import {GlobalVariables} from "../../../global/global-variables";
import {SimpleClientInfoDTO} from "./simple-client-info-dto";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {
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
