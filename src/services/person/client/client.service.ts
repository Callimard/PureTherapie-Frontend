import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ClientDTO} from "./client-dto";
import {GlobalVariables} from "../../../global/global-variables";

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
    return new Promise<ClientDTO>(((resolve, reject) => {
      this.httpClient.post<ClientDTO>(GlobalVariables.CLIENTS_URL + "/" + client.idPerson, client).subscribe({
        next: (clientResp) => {
          console.log("Success to update client, updated client = ", clientResp);
          resolve(clientResp);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Fail to update client, error = ", error.error);
          reject(error.error);
        }
      })
    }));
  }

  public searchClientWithEmail(clientEmail: string): Promise<ClientDTO> {
    return new Promise<ClientDTO>(((resolve, reject) => {
      this.httpClient.get<ClientDTO>(GlobalVariables.CLIENTS_GET_WITH_EMAIL_URL + "?email=" + clientEmail).subscribe({
        next: (client) => {
          resolve(client);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Fail to find client by email, ", error.error);
          reject(error.error);
        }
      })
    }));
  }

  public searchClientsWithFilter(all: boolean = false, lastName?: string, firstName?: string, email?: string, phone?: string): Promise<ClientDTO[]> {
    return new Promise<ClientDTO[]>(((resolve, reject) => {
      this.httpClient.get<ClientDTO[]>(GlobalVariables.CLIENTS_URL + (all ? "?all=true&filter=" : ("?filter="
        + "lastName=" + (lastName ? lastName : '') + "+"
        + "firstName=" + (firstName ? firstName : '') + "+"
        + "email=" + (email ? email : '') + "+"
        + "phone=" + (phone ? '33' + phone : '')))).subscribe({
        next: (clients) => {
          resolve(clients);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Fail to search client with filter", error.error);
          reject(error.error);
        }
      });
    }));
  }
}
