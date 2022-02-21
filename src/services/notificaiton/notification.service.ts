import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationViewDTO} from "./notification-view-dto";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
    // Normal
  }

  public getUserNotifications(filter?: number): Promise<NotificationViewDTO[]> {
    return new Promise<NotificationViewDTO[]>((resolve, reject) => {
      this.httpClient.get<NotificationViewDTO[]>(GlobalVariables.NOTIFICATIONS_URL
        + (filter != null ? '?filter=' + filter : '')).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get user notifications, Err = ", err.error);
          reject(err.error);
        }
      })
    })
  }

  public setNotificationViewed(idNotificationView: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.put(GlobalVariables.NOTIFICATIONS_URL
        + "/" + idNotificationView + GlobalVariables.NOTIFICATIONS_SET_VIEWED, null)
        .subscribe({
          next: () => {
            resolve(true);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to set notification viewed, Err = ", err.error);
            reject(err.error);
          }
        })
    });
  }

}
