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
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU1MTg4NDY3Nn0.op0gsph3D5d1A_XpzppNrwExcQSkEjaLL9h8yi4aFa-V7wjgrAKSHVGuZ5z7JdNezIJvr60gTPFmb9Yu1HMseA')
    });
    console.log(clonedRequest.headers.get('token'));
    return next.handle(clonedRequest);
  }
}
