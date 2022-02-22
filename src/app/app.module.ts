import {LOCALE_ID, NgModule} from '@angular/core';
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
import {
  ClientEditionModalComponent
} from './administration/client/client-administration/client-edition-modal/client-edition-modal.component';
import {SuccessModalComponent} from './util/modal/success-modal/success-modal.component';
import {
  ClientRegistrationModalComponent
} from './administration/client/client-administration/client-registration-modal/client-registration-modal.component';
import {FailModalComponent} from './util/modal/fail-modal/fail-modal.component';
import {ProductPurchaseComponent} from './administration/product/product-purchase/product-purchase.component';
import {
  ProductPurchaseModalComponent
} from './administration/product/product-purchase/product-purchase-modal/product-purchase-modal.component';
import {AgendaComponent} from './administration/agenda/agenda.component';
import {
  CreateAppointmentModalComponent
} from './administration/agenda/create-appointment-modal/create-appointment-modal.component';
import {
  AppointmentSummaryModalComponent
} from './administration/agenda/appointment-summary-modal/appointment-summary-modal.component';
import {
  SimpleConfirmationModalComponent
} from './util/modal/simple-confirmation-modal/simple-confirmation-modal.component';
import {
  ClientBundlePurchaseEditionModalComponent
} from './administration/client/client-administration/client-edition-modal/client-products/client-packages/client-bundle-purchase-edition-modal/client-bundle-purchase-edition-modal.component';
import {
  ClientPaymentModalComponent
} from './administration/client/client-administration/client-payment-modal/client-payment-modal.component';
import {WaitingRoomComponent} from './administration/waiting-room/waiting-room.component';
import {ClientArrivalModalComponent} from './administration/agenda/client-arrival-modal/client-arrival-modal.component';
import {
  ClientWaitingRoomInfoModalComponent
} from './administration/waiting-room/client-waiting-room-info-modal/client-waiting-room-info-modal.component';
import {
  TerminateClientModalComponent
} from './administration/agenda/terminate-client-modal/terminate-client-modal.component';
import {
  BundlePurchaseModalComponent
} from './administration/product/product-purchase/bundle-purchase-modal/bundle-purchase-modal.component';
import {OpeningTimeComponent} from './administration/opening-time/opening-time.component';
import {SearchClientComponent} from './client/search-client/search-client.component';
import {
  ClientProductsComponent
} from './administration/client/client-administration/client-edition-modal/client-products/client-products.component';
import {
  ClientPackagesComponent
} from './administration/client/client-administration/client-edition-modal/client-products/client-packages/client-packages.component';
import {
  ClientAestheticCaresComponent
} from './administration/client/client-administration/client-edition-modal/client-products/client-aesthetic-cares/client-aesthetic-cares.component';
import {
  ClientInformationComponent
} from './administration/client/client-administration/client-edition-modal/client-information/client-information.component';
import {
  ClientBundleRowComponent
} from './administration/client/client-administration/client-edition-modal/client-products/client-packages/client-bundle-row/client-bundle-row.component';
import {
  ClientAestheticCareRowComponent
} from './administration/client/client-administration/client-edition-modal/client-products/client-aesthetic-cares/client-aesthetic-care-row/client-aesthetic-care-row.component';
import {
  AgendaPerTechnicianComponent
} from './administration/agenda/agenda-per-technician/agenda-per-technician.component';
import {AgendaChooseDateComponent} from './administration/agenda/agenda-choose-date/agenda-choose-date.component';
import {registerLocaleData} from "@angular/common";

import localeFr from '@angular/common/locales/fr';
import { NotificationsComponent } from './administration/notifications/notifications.component';
import { NotificationsSimpleFilterComponent } from './administration/notifications/notifications-simple-filter/notifications-simple-filter.component';
import { NotificationTabComponent } from './administration/notifications/notification-tab/notification-tab.component';
import { NotificationTabRowComponent } from './administration/notifications/notification-tab/notification-tab-row/notification-tab-row.component';
import { NotificationModalComponent } from './administration/notifications/notification-tab/notification-modal/notification-modal.component';
import { GlobalOpeningTimeModalComponent } from './administration/opening-time/global-opening-time-modal/global-opening-time-modal.component';
import { ExceptionalOpeningTimeModalComponent } from './administration/opening-time/exceptional-opening-time-modal/exceptional-opening-time-modal.component';
import { ExceptionalCloseModalComponent } from './administration/opening-time/exceptional-close-modal/exceptional-close-modal.component';
import { EditGlobalOpeningTimeModalComponent } from './administration/opening-time/edit-global-opening-time-modal/edit-global-opening-time-modal.component';
import { EditExceptionalOpeningModalComponent } from './administration/opening-time/edit-exceptional-opening-modal/edit-exceptional-opening-modal.component'
registerLocaleData(localeFr, 'fr');

const appRoutes: Routes = [
  {path: GlobalVariables.INTERN_LOGIN_URL, component: LoginComponent},
  {path: GlobalVariables.INTERN_CLIENTS_HOME_URL, component: ClientHomeComponent},
  {path: GlobalVariables.INTERN_CLIENTS_REGISTRATION_URL, component: ClientRegistrationComponent},
  {path: GlobalVariables.INTERN_APPOINTMENTS_URL, component: TakeAppointmentComponent},
  {path: GlobalVariables.INTERN_ADMINISTRATION_CLIENT_URL, component: ClientAdministrationComponent},
  {path: GlobalVariables.INTERN_PRODUCT_PURCHASE_URL, component: ProductPurchaseComponent},
  {path: GlobalVariables.INTERN_AGENDA_URL, component: AgendaComponent},
  {path: GlobalVariables.INTERN_WAITING_ROOM, component: WaitingRoomComponent},
  {path: GlobalVariables.INTERN_OPENING_TIME, component: OpeningTimeComponent},
  {path: GlobalVariables.INTER_NOTIFICATIONS, component: NotificationsComponent},
  {path: '', redirectTo: GlobalVariables.INTERN_LOGIN_URL, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientRegistrationComponent,
    HomeComponent,
    TakeAppointmentComponent,
    ClientHomeComponent,
    ClientAdministrationComponent,
    ClientEditionModalComponent,
    SuccessModalComponent,
    ClientRegistrationModalComponent,
    FailModalComponent,
    ProductPurchaseComponent,
    ProductPurchaseModalComponent,
    AgendaComponent,
    CreateAppointmentModalComponent,
    AppointmentSummaryModalComponent,
    SimpleConfirmationModalComponent,
    ClientBundlePurchaseEditionModalComponent,
    ClientPaymentModalComponent,
    WaitingRoomComponent,
    ClientArrivalModalComponent,
    ClientWaitingRoomInfoModalComponent,
    TerminateClientModalComponent,
    BundlePurchaseModalComponent,
    OpeningTimeComponent,
    SearchClientComponent,
    ClientProductsComponent,
    ClientPackagesComponent,
    ClientAestheticCaresComponent,
    ClientInformationComponent,
    ClientBundleRowComponent,
    ClientAestheticCareRowComponent,
    AgendaPerTechnicianComponent,
    AgendaChooseDateComponent,
    NotificationsComponent,
    NotificationsSimpleFilterComponent,
    NotificationTabComponent,
    NotificationTabRowComponent,
    NotificationModalComponent,
    GlobalOpeningTimeModalComponent,
    ExceptionalOpeningTimeModalComponent,
    ExceptionalCloseModalComponent,
    EditGlobalOpeningTimeModalComponent,
    EditExceptionalOpeningModalComponent
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
    },
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
