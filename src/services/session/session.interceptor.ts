import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class SessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("In session interceptor")

    if (this.cookieService.check(GlobalVariables.SESSION_ID)) {
      console.log("Set cookie");
      request.headers.set('Set-Cookie', 'jsessionid=' + this.cookieService.get(GlobalVariables.SESSION_ID));
      console.log("Request header = %s", request.headers)
    }

    return next.handle(request);
  }
}
