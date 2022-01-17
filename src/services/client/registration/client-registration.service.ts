import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalVariables} from "../../../global/global-variables";
import {ClientDTO} from "./client-dto";
import {ClientRegistrationResponseDTO} from "./client-registration-response-dto";

@Injectable({
  providedIn: 'root'
})
export class ClientRegistrationService {

  constructor(private httpClient: HttpClient) {
  }

  public registerClient(clientRegistrationDTO: ClientDTO): Promise<ClientRegistrationResponseDTO> {
    return new Promise<any>(((resolve, reject) => {
      this.httpClient.post<ClientRegistrationResponseDTO>(GlobalVariables.CLIENTS_URL + "?doubloonVerification=true", clientRegistrationDTO).subscribe({
        next: resp => {
          console.log('Response from registration');
          console.log(resp);
          resolve(resp);
        },
        error: err => {
          console.log('Fail registration')
          console.log(err)
          reject(err)
        }
      })
    }));
  }

}
