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

  public static readonly AESTHETIC_CARE_PACKAGES_URL = GlobalVariables.API_V1_URL + "/aesthetic_care_packages";
  public static readonly AESTHETIC_CARE_PURCHASE = "/purchase";

  public static readonly BUNDLES_URL = GlobalVariables.API_V1_URL + "/bundles";
  public static readonly BUNDLE_PURCHASE = "/purchase";
  public static readonly CLIENT_ALL_BUNDLE_PURCHASES = "/purchases";


  public static readonly TECHNICIANS_URL = GlobalVariables.API_V1_URL + "/technicians";

  public static readonly AGENDA_URL = GlobalVariables.API_V1_URL + "/agenda";
  public static readonly TECHNICIAN_FREE_TIME_SLOTS_URL = GlobalVariables.AGENDA_URL + "/technicians/free_time_slots";
  public static readonly DAY_ALL_TIME_SLOTS_URL = GlobalVariables.AGENDA_URL + "/time_slots";
  public static readonly DAY_ALL_TECHNICIAN_TIME_SLOTS_URL = GlobalVariables.AGENDA_URL + "/technician/time_slots";

  public static readonly APPOINTMENTS_URL = GlobalVariables.API_V1_URL + "/appointments";
  public static readonly APPOINTMENTS_CANCELLATION_URL = GlobalVariables.APPOINTMENTS_URL + "/cancel";
}
