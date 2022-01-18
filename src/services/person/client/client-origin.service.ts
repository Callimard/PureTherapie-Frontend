import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonOriginDTO} from "./person-origin-dto";
import {GlobalVariables} from "../../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class ClientOriginService {

  public static readonly NO_ORIGIN = new PersonOriginDTO(1, "None");

  constructor(private httpClient: HttpClient) {
  }

  public getAllPersonOrigins(): Promise<PersonOriginDTO[]> {
    return new Promise<PersonOriginDTO[]>((resolve, reject) => {
      this.httpClient.get<PersonOriginDTO[]>(GlobalVariables.PERSON_ORIGINS_URL, {
        withCredentials: false
      }).subscribe({
          next: (resp) => {
            console.log(resp);
            resolve(resp);
          },
          error: (err) => {
            console.log(err);
            resolve([ClientOriginService.NO_ORIGIN]);
          }
        }
      );
    });
  }
}
