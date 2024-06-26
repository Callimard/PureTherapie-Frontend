import {Injectable} from '@angular/core';
import {BasicCredential} from "./basic-credential";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalVariables} from "../../global/global-variables";
import {Router} from "@angular/router";
import {SimpleResponseDTO} from "../util/simple-response-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public static readonly IS_AUTHENTICATED_LS_KEY = "isAuthenticated";

  private basicCredential?: BasicCredential;
  private authenticated: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {
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
        this.router.navigate(['/', GlobalVariables.INTERN_LOGIN_URL]);
      },
      error: () => {
        this.setNotAuthenticated();
        this.router.navigate(['/', GlobalVariables.INTERN_LOGIN_URL]);
      }
    });
  }

  public checkLogin() {
    this.httpClient.head<SimpleResponseDTO>(GlobalVariables.LOGIN_URL).subscribe({
      next: () => {
        this.setAuthenticated();
      },
      error: (error: HttpErrorResponse) => {
        console.error("Fail to check login, set non authenticated, Error = ", error.error);
        this.setNotAuthenticated();
        this.router.navigate(['/' + GlobalVariables.INTERN_LOGIN_URL]);
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
