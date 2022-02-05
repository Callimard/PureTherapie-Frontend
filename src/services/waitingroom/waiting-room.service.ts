import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {WaitingRoomDTO} from "./waiting-room-dto";
import {GlobalVariables} from "../../global/global-variables";
import {SimpleResponseDTO} from "../util/simple-response-dto";

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

  public removeClientFromWaitingRoom(idClient: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.delete<SimpleResponseDTO>(GlobalVariables.WAITING_ROOM_URL + "/" + idClient).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to remove from WR, Err = ", err.error);
          reject(err.error);
        }
      })
    }))
  }
}
