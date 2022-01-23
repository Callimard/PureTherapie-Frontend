import {Component} from '@angular/core';
import {AuthenticationService} from "../services/auth/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'puretherapie-agenda-crm-angular-front-end';

  constructor(private authService: AuthenticationService) {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    console.log("Try to logout");
    this.authService.logout();
  }

  username(): string | undefined {
    return this.authService.currentBasicCredential()?.username;
  }
}
