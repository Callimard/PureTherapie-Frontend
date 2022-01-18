import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../../global/global-variables";
import {ClientDTO} from "./client-dto";
import {ClientRegistrationSuccessDTO} from "./client-registration-success-dto";

@Injectable({
  providedIn: 'root'
})
export class ClientRegistrationService {

  constructor(private httpClient: HttpClient) {
  }

  public registerClient(clientRegistrationDTO: ClientDTO): Promise<ClientRegistrationSuccessDTO> {
    return new Promise<any>(((resolve, reject) => {
      this.httpClient.post<ClientRegistrationSuccessDTO>(GlobalVariables.CLIENTS_URL + "?doubloonVerification=true", clientRegistrationDTO).subscribe({
        next: resp => {
          resolve(resp);
        },
        error: (err: HttpErrorResponse) => {
          reject(err.error)
        }
      })
    }));
  }

}
