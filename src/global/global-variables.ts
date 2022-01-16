import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalVariables {

  // BACKEND Session

  public static readonly SESSION_ID = "JSESSIONID"

  // BACKEND URL

  public static readonly BACK_END_URL = "http://localhost:8080";

  public static readonly API_V1_URL = GlobalVariables.BACK_END_URL + "/api/v1"

  public static readonly USERS_URL = GlobalVariables.API_V1_URL + "/users";
  public static readonly LOGIN_URL = GlobalVariables.USERS_URL + "/login";
  public static readonly LOGOUT_URL = GlobalVariables.USERS_URL + "/logout";

}
