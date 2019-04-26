import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {GlobalService} from './global.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private globalService: GlobalService,
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      url: environment.dev_test_url + req.url,
      headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzU2MjQ1MTQzMiIsImV4cCI6MTU1NjI4MzU0OX0.W7evDGD4DAQfB93osn2x-fj2QCOCdU6X_2ZZlPFrv-hvKYt2_DeOQ0mFRS1Q06qotBcRKd9Sz-RMpAWSa7EmNA')
    });
    return next.handle(clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event) {
          return of(event);
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        this.globalService.remindEvent.next(false);
        if (err.status === 0) {
          this.router.navigate(['/error'], {queryParams: {status: 404, msg: '连接服务区失败，请检查网络！', url: null}});
        }
        return Observable.create(observer => observer.next(err));
      })
    );
    /*if (this.globalService.wxSessionGetObject('token')) {
      const clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('token', this.globalService.wxSessionGetObject('token'))
      });
      return next.handle(clonedRequest).pipe(
        map((event: any, ) => {
          if (event.status === 200) {
            return event;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.globalService.remindEvent.next(false);
          if (err.status === 0) {
            this.router.navigate(['/error']);
          }
          return Observable.create(observer => observer.next(err));
        })
      );
    }
    else {
      const clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
      });
      return next.handle(clonedRequest).pipe(
        map((event: any, ) => {
          if (event.status === 200) {
            return event;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.globalService.remindEvent.next(false);
          if (err.status === 0) {
            this.router.navigate(['/error'], {queryParams: {status: 404, msg: '连接服务区失败，请检查网络！', url: null}});
          }
          if (err.status === 403) {
            this.router.navigate(['/error'], {queryParams: {status: 403, msg: 'token认证失败！', url: null}});
          }
          return Observable.create(observer => observer.next(err));
        })
      );
    }*/
  }
}
