import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/person/user/user.service";

@Component({
  selector: 'app-init-user-password',
  templateUrl: './init-user-password.component.html',
  styleUrls: ['./init-user-password.component.css'],
  host: {'class': 'init-user-password'}
})
export class InitUserPasswordComponent implements OnInit {

  code?: string;
  username?: string;

  newPassword: string = "";
  newPasswordConfirm: string = "";

  notIdentical: boolean = false;

  sendReset: boolean = false;
  success: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeUrlParam();
  }

  private chargeUrlParam() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.code = params['code'];
        this.username = params['username'];
      },
      error: (err) => console.error("Fail to extract url param, Err = ", err)
    });
  }

  submitPassword() {
    if (this.newPassword.length > 0) {
      if (this.passwordAreIdentical()) {
        this.sendReset = true;
        if (this.username && this.code) {
          this.userService.resetPassword(this.username, this.code, this.newPassword)
            .then(() => this.success = true)
            .catch(() => this.success = false);
        }
      }
    }
  }

  private passwordAreIdentical(): boolean {
    if (this.newPassword !== this.newPasswordConfirm) {
      this.notIdentical = true;
      return false;
    } else {
      this.notIdentical = false;
      return true;
    }
  }
}
