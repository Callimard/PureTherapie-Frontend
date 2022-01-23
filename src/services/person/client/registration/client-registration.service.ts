import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../../../global/global-variables";
import {ClientDTO} from "../client-dto";
import {ClientRegistrationSuccessDTO} from "./client-registration-success-dto";

@Injectable({
  providedIn: 'root'
})
export class ClientRegistrationService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * NO +33 for the phone just 6 00 00 00 00
   *
   * @param clientDTO
   * @param doubloonVerification
   */
  public registerClient(clientDTO: ClientDTO, doubloonVerification: boolean = true): Promise<ClientRegistrationSuccessDTO> {
    let client = ClientDTO.formatForSend(clientDTO);
    return new Promise<ClientRegistrationSuccessDTO>(((resolve, reject) => {
      this.httpClient.post<ClientRegistrationSuccessDTO>(GlobalVariables.CLIENTS_URL + ("?doubloonVerification="
        + doubloonVerification), client)
        .subscribe({
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
