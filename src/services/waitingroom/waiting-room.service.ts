import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {WaitingRoomDTO} from "./waiting-room-dto";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class WaitingRoomService {

  constructor(private httpClient: HttpClient) {
  }

  // Methods.

  public getAllWaitingRoomRow(): Promise<WaitingRoomDTO[]> {
    return new Promise<WaitingRoomDTO[]>(((resolve, reject) => {
      this.httpClient.get<WaitingRoomDTO[]>(GlobalVariables.WAITING_ROOM_URL).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all waiting room rows.")
          reject(err);
        }
      })
    }))
  }
}
