import {Injectable} from '@angular/core';
import {BasicCredential} from "./basic-credential";
import {HttpClient} from "@angular/common/http";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private basicCredential: BasicCredential;
  private authenticated: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.basicCredential = new BasicCredential();
  }

  public login(username: string, password: string) {
    this.basicCredential.username = username;
    this.basicCredential.password = password;

    this.httpClient.post(GlobalVariables.LOGIN_URL, null, {
      headers: {'Authorization': this.basicCredential.basicCredential()},
      withCredentials: true
    }).subscribe({
      next: () => {
        console.log("Success to login");
        this.authenticated = true;
      },
      error: () => {
        console.log("Fail to login")
        this.authenticated = false;
      }
    });
  }

  public logout(): void {
    this.basicCredential = new BasicCredential();

    this.httpClient.post(GlobalVariables.LOGOUT_URL, null, {withCredentials: true}).subscribe({
      next: () => {
        console.log("Success to logout");
      },
      error: () => {
        console.log("Fail to logout");
      }
    });
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public currentBasicCredential(): BasicCredential {
    return new BasicCredential(this.basicCredential.username, this.basicCredential.password);
  }
}
