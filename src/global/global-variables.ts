import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalVariables {

  // Utils

  public static readonly TRUE_STRING: string = "true";
  public static readonly FALSE_STRING: string = "false";

  // INTERN URL

  public static readonly INTERN_LOGIN_URL = 'login';
  public static readonly INTERN_CLIENTS_HOME_URL = 'clients/home';
  public static readonly INTERN_CLIENTS_REGISTRATION_URL = 'clients/registration';
  public static readonly INTERN_APPOINTMENTS_URL = 'appointments';
  public static readonly INTERN_ADMINISTRATION_URL = 'administration';
  public static readonly INTERN_ADMINISTRATION_CLIENT_URL = GlobalVariables.INTERN_ADMINISTRATION_URL + '/clients';
  public static readonly INTERN_PRODUCT_PURCHASE_URL = 'product-purchase';
  public static readonly INTERN_AGENDA_URL = 'agenda';
  public static readonly INTERN_WAITING_ROOM = 'waiting_room';
  public static readonly OPENING_TIME = 'opening';

  // BACKEND Session

  public static readonly SESSION_ID = "JSESSIONID"

  // BACKEND CSRF

  public static readonly CSRF_COOKIE = "XSRF-TOKEN";
  public static readonly CSRF_HEADER = "X-XSRF-TOKEN";

  // BACKEND URL

  public static readonly BACK_END_URL = "http://localhost:8080";

  public static readonly API_V1_URL = GlobalVariables.BACK_END_URL + "/api/v1"

  public static readonly USERS_URL = GlobalVariables.API_V1_URL + "/users";
  public static readonly LOGIN_URL = GlobalVariables.USERS_URL + "/login";
  public static readonly LOGOUT_URL = GlobalVariables.USERS_URL + "/logout";

  public static readonly CLIENTS_URL = GlobalVariables.API_V1_URL + "/clients";
  public static readonly CLIENTS_GET_WITH_EMAIL_URL = GlobalVariables.CLIENTS_URL + "/searchWithEmail";

  public static readonly PERSON_ORIGINS_URL = GlobalVariables.CLIENTS_URL + "/person_origins";

  public static readonly AESTHETIC_CARES_URL = GlobalVariables.API_V1_URL + "/aesthetic_cares";
  public static readonly CLIENT_ALL_SESSION_PURCHASES_URL = GlobalVariables.AESTHETIC_CARES_URL + "/purchases";
  public static readonly AESTHETIC_CARE_PURCHASE = "/purchase";
  public static readonly UNPAID_AESTHETIC_CARE_PURCHASES = GlobalVariables.CLIENT_ALL_SESSION_PURCHASES_URL + "/unpaid";
  public static readonly CLIENT_AC_STOCK = "/stock";

  public static readonly AESTHETIC_CARE_PROVISIONS = GlobalVariables.API_V1_URL + "/aesthetic_care_provisions";
  public static readonly AESTHETIC_CARE_PROVISIONS_BY_APPOINTMENT = GlobalVariables.AESTHETIC_CARE_PROVISIONS + "/appointment";

  public static readonly AESTHETIC_CARE_PACKAGES_URL = GlobalVariables.API_V1_URL + "/aesthetic_care_packages";

  public static readonly BUNDLES_URL = GlobalVariables.API_V1_URL + "/bundles";
  public static readonly BUNDLE_PURCHASE = "/purchase";
  public static readonly CLIENT_ALL_BUNDLE_PURCHASES_URL = GlobalVariables.BUNDLES_URL + "/purchases";
  public static readonly UNPAID_BUNDLE_PURCHASES = GlobalVariables.CLIENT_ALL_BUNDLE_PURCHASES_URL + "/unpaid";
  public static readonly ALL_BUNDLE_PURCHASE_STOCKS = "/stocks";

  public static readonly TECHNICIANS_URL = GlobalVariables.API_V1_URL + "/technicians";

  public static readonly AGENDA_URL = GlobalVariables.API_V1_URL + "/agenda";
  public static readonly TECHNICIAN_FREE_TIME_SLOTS_URL = GlobalVariables.AGENDA_URL + "/technicians/free_time_slots";
  public static readonly DAY_ALL_TIME_SLOTS_URL = GlobalVariables.AGENDA_URL + "/time_slots";
  public static readonly DAY_ALL_TECHNICIAN_TIME_SLOTS_URL = GlobalVariables.AGENDA_URL + "/technician/time_slots";

  public static readonly APPOINTMENTS_URL = GlobalVariables.API_V1_URL + "/appointments";
  public static readonly APPOINTMENTS_CANCELLATION_URL = GlobalVariables.APPOINTMENTS_URL + "/cancel";
  public static readonly CLIENT_ARRIVAL_URL = GlobalVariables.APPOINTMENTS_URL + "/client_arrive";
  public static readonly PROVISION_CLIENT_WITH_APPOINTMENT_URL = GlobalVariables.APPOINTMENTS_URL + "/provision_client_with_appointment";
  public static readonly PROVISION_CLIENT_WITHOUT_APPOINTMENT_URL = GlobalVariables.APPOINTMENTS_URL + "/provision_client_without_appointment";

  public static readonly BILL_URL = GlobalVariables.API_V1_URL + "/bills";
  public static readonly PAY_BILL_URL = GlobalVariables.BILL_URL + "/pay";
  public static readonly MEANS_OF_PAYMENTS_URL = GlobalVariables.BILL_URL + "/means_of_payments";
  public static readonly PAYMENTS_URL = GlobalVariables.BILL_URL + "/payments";

  public static readonly WAITING_ROOM_URL = GlobalVariables.API_V1_URL + "/waiting_room";

}
