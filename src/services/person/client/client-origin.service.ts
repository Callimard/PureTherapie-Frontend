import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {PersonOriginDTO} from "./person-origin-dto";
import {GlobalVariables} from "../../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class ClientOriginService {

  public static readonly NO_ORIGIN = new PersonOriginDTO(1, "Aucune");

  constructor(private httpClient: HttpClient) {
  }

  public getAllPersonOrigins(): Promise<PersonOriginDTO[]> {
    return new Promise<PersonOriginDTO[]>((resolve) => {
      this.httpClient.get<PersonOriginDTO[]>(GlobalVariables.PERSON_ORIGINS_URL, {
        withCredentials: false
      }).subscribe({
          next: (resp) => {
            resolve(resp);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
            resolve([ClientOriginService.NO_ORIGIN]);
          }
        }
      );
    });
  }
}
