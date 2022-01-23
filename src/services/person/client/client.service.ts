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
        + "phone=" + (phone ? '\t%2B33' + phone : '') + "+"))).subscribe({
        next: (clients) => {
          console.log("Success to search client with filter", clients);
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
