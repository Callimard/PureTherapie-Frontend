import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './user/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HttpBasicInterceptor} from "../services/http/http-basic.interceptor";
import {CSRFInterceptor} from "../services/csfr/csrf.interceptor";
import {RouterModule, Routes} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {SessionInterceptor} from "../services/session/session.interceptor";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpBasicInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CSRFInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: SessionInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
