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
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU1MTE5NzA0OH0.Zu9D_3z4btIMNYD6hG7YqwaRYCLLFU410bp6WC6gXxOLcXdEM5F3KLmzXXODKPeR-EABaAYwfWRt6L1iQYvSEA')
    });
    console.log(clonedRequest.headers.get('token'));
    return next.handle(clonedRequest);
  }
}
