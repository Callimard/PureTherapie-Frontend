import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly EMPTY_USERNAME: string = '';
  readonly EMPTY_PASSWORD: string = ''

  submitted: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    // Nothing to do for now
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.submitted = true;
    this.authService.login(form.value['username'], form.value['password']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
