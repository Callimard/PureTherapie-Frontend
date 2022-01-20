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
      this.httpClient.get<ClientDTO>(GlobalVariables.CLIENT_SEARCH_WITH_EMAIL_URL + "?email=" + clientEmail).subscribe({
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
}
