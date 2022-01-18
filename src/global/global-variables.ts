import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalVariables {

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

  public static readonly PERSON_ORIGINS_URL = GlobalVariables.CLIENTS_URL + "/person_origins";

  public static readonly AESTHETIC_CARES_URL = GlobalVariables.API_V1_URL + "/aesthetic_cares";

  public static readonly TECHNICIANS_URL = GlobalVariables.API_V1_URL + "/technicians";

  public static readonly AGENDA_URL = GlobalVariables.API_V1_URL + "/agenda";
  public static readonly TECHNICIAN_FREE_TIME_SLOTS_URL = GlobalVariables.AGENDA_URL + "/technicians/free_time_slots";

}
