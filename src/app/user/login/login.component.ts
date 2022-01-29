import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {Router} from "@angular/router";
import {GlobalVariables} from "../../../global/global-variables";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly EMPTY_USERNAME: string = '';
  readonly EMPTY_PASSWORD: string = ''

  submitted: boolean = false;
  error: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    // Nothing to do for now
    this.submitted = false;
    this.error = false;

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/' + GlobalVariables.INTERN_AGENDA_URL]);
    }
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.error = false;
    this.authService.login(form.value['username'], form.value['password']).then(() => {
      this.router.navigate(['/' + GlobalVariables.INTERN_AGENDA_URL]);
    }).catch(err => {
      console.log("Fail login %s", err);
      this.error = true;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
