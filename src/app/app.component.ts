import {Component} from '@angular/core';
import {AuthenticationService} from "../services/auth/authentication.service";
import {Router} from "@angular/router";
import {GlobalVariables} from "../global/global-variables";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'puretherapie-agenda-crm-angular-front-end';

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    console.log("Try to logout");
    this.authService.logout();
    this.router.navigate(['/', GlobalVariables.INTERN_LOGIN_URL]);
  }

  username(): string | undefined {
    return this.authService.currentBasicCredential()?.username;
  }
}
