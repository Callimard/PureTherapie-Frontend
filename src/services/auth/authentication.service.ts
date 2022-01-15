import {Injectable} from '@angular/core';
import {BasicCredential} from "./basic-credential";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalVariables} from "../../global/global-variables";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private basicCredential: BasicCredential;
  private authenticated: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.basicCredential = new BasicCredential();
  }

  public login(username: string, password: string): Observable<any> {
    this.basicCredential.username = username;
    this.basicCredential.password = password;

    let obs: Observable<any> = this.httpClient.post(GlobalVariables.LOGIN_URL, null, {
      headers: new HttpHeaders({'Authorization': this.basicCredential.basicCredential()})
    });

    obs.subscribe({
      next: () => {
        console.log("Success to login");
        this.authenticated = true;
      },
      error: () => {
        console.log("Fail to login")
        this.authenticated = false;
      }
    })

    return obs;
  }

  public logout(): Observable<any> {
    this.basicCredential = new BasicCredential();

    let obs: Observable<any> = this.httpClient.post(GlobalVariables.LOGOUT_URL, null);

    obs.subscribe({
      next: () => {
        console.log("Success to logout");
      },
      error: () => {
        console.log("Fail to logout");
      }
    })
    return obs;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public currentBasicCredential(): BasicCredential {
    return new BasicCredential(this.basicCredential.username, this.basicCredential.password);
  }
}
