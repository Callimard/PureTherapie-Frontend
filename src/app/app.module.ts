import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './user/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ClientRegistrationComponent} from './client/client-registration/client-registration.component';
import {HomeComponent} from './home/home/home.component';
import {SecurityInterceptor} from "../services/http/security.interceptor";
import {TakeAppointmentComponent} from './appointment/take-appointment/take-appointment.component';
import {ClientHomeComponent} from './client/client-home/client-home.component';
import {GlobalVariables} from "../global/global-variables";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {
  ClientAdministrationComponent
} from './administration/client/client-administration/client-administration.component';
import {AuthenticationService} from "../services/auth/authentication.service";

const appRoutes: Routes = [
  {path: GlobalVariables.INTERN_LOGIN_URL, component: LoginComponent},
  {path: GlobalVariables.INTERN_CLIENTS_HOME_URL, component: ClientHomeComponent},
  {path: GlobalVariables.INTERN_CLIENTS_REGISTRATION_URL, component: ClientRegistrationComponent},
  {path: GlobalVariables.INTERN_APPOINTMENTS_URL, component: TakeAppointmentComponent},
  {path: GlobalVariables.INTERN_ADMINISTRATION_CLIENT_URL, component: ClientAdministrationComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientRegistrationComponent,
    HomeComponent,
    TakeAppointmentComponent,
    ClientHomeComponent,
    ClientAdministrationComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
