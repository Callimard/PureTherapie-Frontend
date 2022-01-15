import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.submitted = true;

    this.authService.login(form.value['username'], form.value['password']).subscribe({
      next: (msg: string) => {
        console.log("Success, msg = %s", msg);
        this.error = false;
      },
      error: (error: HttpErrorResponse) => {
        this.error = true;
        console.log("Error, error = %s", error.message);
      }
    });
  }

}
