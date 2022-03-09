import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
    // Normal
  }

  public passwordForgotten(username: string) {
    this.httpClient.post(GlobalVariables.USER_FORGOTTEN_PASSWORD_URL + "?username=" + username, null)
      .subscribe({
        next: () => console.log("Mail send"),
        error: (err: HttpErrorResponse) => console.error("Fail to make new password, Err = ", err.error)
      })
  }

  public resetPassword(username: string, code: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.USER_RESET_PASSWORD_URL
        + "?code=" + code + "&username=" + username, password).subscribe({
        next: (res) => resolve(res),
        error: (err: HttpErrorResponse) => console.error("Fail to reset password, Err = ", err.error)
      });
    });
  }
}
