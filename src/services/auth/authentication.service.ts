import {Injectable} from '@angular/core';
import {BasicCredential} from "./basic-credential";
import {HttpClient} from "@angular/common/http";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public static readonly IS_AUTHENTICATED_LS_KEY = "isAuthenticated";

  private basicCredential?: BasicCredential;
  private authenticated: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  public login(username: string, password: string): Promise<string> {
    this.basicCredential = new BasicCredential(username, password);
    let basicCredString = this.basicCredential.basicCredential();

    return new Promise<any>(((resolve, reject) => {
      this.httpClient.post(GlobalVariables.LOGIN_URL, null, {
        headers: {'Authorization': basicCredString},
        withCredentials: true
      }).subscribe({
          next: () => {
            console.log("Success to login");
            this.setAuthenticated();
            resolve('login success');
          },
          error: () => {
            this.setNotAuthenticated();
            reject('login fail');
          }
        }
      )
    }));
  }

  public logout(): void {
    this.basicCredential = new BasicCredential();

    this.httpClient.post(GlobalVariables.LOGOUT_URL, null).subscribe({
      next: () => {
        this.setNotAuthenticated();
      },
      error: () => {
        this.setNotAuthenticated();
      }
    });
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthenticationService.IS_AUTHENTICATED_LS_KEY) === GlobalVariables.TRUE_STRING;
  }

  public currentBasicCredential(): BasicCredential | undefined {
    return this.basicCredential;
  }

  private setAuthenticated() {
    this.authenticated = true;
    localStorage.setItem(AuthenticationService.IS_AUTHENTICATED_LS_KEY, String(this.authenticated));
  }

  private setNotAuthenticated() {
    this.authenticated = false;
    localStorage.setItem(AuthenticationService.IS_AUTHENTICATED_LS_KEY, String(this.authenticated));
  }
}
