import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {Router} from "@angular/router";
import {GlobalVariables} from "../../../global/global-variables";
import {UserService} from "../../../services/person/user/user.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  SimpleConfirmationModalComponent
} from "../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly EMPTY_USERNAME: string = '';
  readonly EMPTY_PASSWORD: string = '';

  submitted: boolean = false;
  error: boolean = false;

  username: string = "";

  constructor(private authService: AuthenticationService, private userService: UserService, private router: Router,
              private modalService: BsModalService) {
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

  confirmForgottenPassword() {
    if (this.username != null && this.username.length > 0) {
      let confirmModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
      confirmModal.content.title = "Confirmation envoie de mail de mot de passe oublié";
      confirmModal.content.text = "Êtes-vous sûr de vouloir envoyé un mail à Pascal pour générer un nouveau mdp pour " +
        "l'utilisateur <strong>" + this.username + "</strong>?";
      confirmModal.content.confirmationFunction = () => this.forgottenPassword();
    }
  }

  forgottenPassword() {
    this.userService.passwordForgotten(this.username);
  }

}
