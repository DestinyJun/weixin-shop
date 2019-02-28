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
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU1MTQ1NTUxNn0.Drq58-iFLuHyKL52quVWC4O9AzH7A-kKSwx4hE-A8iyg9dCswheKnNLl2bzBMTH8NCtEPlTC3wLErAfB_Fx3dA')
    });
    console.log(clonedRequest.headers.get('token'));
    return next.handle(clonedRequest);
  }
}
