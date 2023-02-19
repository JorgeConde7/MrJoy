import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from 'src/app/util/token.util';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addAuthorization(request)
    return next.handle(request);
  }


  private addAuthorization(request: HttpRequest<unknown>) {
    let jwt = getToken();

    if (jwt) {
      const auth = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + jwt)
      });
      return auth;
    }
    // this.router.navigate(['/', 'login']);
    return request;
  }
}
