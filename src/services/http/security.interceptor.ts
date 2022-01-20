import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {GlobalVariables} from "../../global/global-variables";

@Injectable({
  providedIn: 'root'
})
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.cookieService.check(GlobalVariables.CSRF_COOKIE) && !request.withCredentials) {
      request = request.clone({
        headers: request.headers.set(GlobalVariables.CSRF_HEADER, this.cookieService.get(GlobalVariables.CSRF_COOKIE))
      });
    }

    return next.handle(request);
  }
}
