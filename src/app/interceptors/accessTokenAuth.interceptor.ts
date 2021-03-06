import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AccessTokenAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get the current logged in user access token
    const access_token = this.authService.access_token;

    // if user has access token, use it
    if (access_token) {
      const authReq = req.clone({
        setHeaders: {'Authorization': access_token}
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
