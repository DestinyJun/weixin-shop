import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('Content-type', 'application/json; charset=UTF-8')
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU1MTM2NDMwNn0.ABMhnlgWtAVDIVB3LoeCPCVstStZzPepsVA5NQ1LQwPi9lm9AWJggA4hEJLbhqO7NWng8Dykr-Rhf72NKJ-cxA')
    });
    console.log(clonedRequest.headers.get('token'));
    return next.handle(clonedRequest);
  }
}
