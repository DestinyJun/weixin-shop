import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, map} from 'rxjs/operators';
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
      // url: 'http://192.168.1.9' + req.url,
      headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
        // .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY4NTQ4ODA4NCIsImV4cCI6MTU1NzA0NzkxNX0.0YeNu7-kExYnZs1evQPs1ItToxccIX5nnLclr2fS3WkSvezgQnkYjFWIDRcQRT_qloz-ct47Yi1Tzh80TW1HXA')
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY4NTQ4ODA4NCIsImV4cCI6MTU1NzM0NDkwMH0.eBKSrBupoZL6werZpv4jYmNzxSAhe80Y0zmIGne7bg6RfqeA_qsy4pCHVhb7ArOdFgOYgvgzQ-C39jYXxDtWbA')
    });
    return next.handle(clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event) {
          return of(event);
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        this.globalService.remindEvent.next(false);
        if (err.status === 0) {
          /*this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              url: null,
              btn: '请重试'
            }
          });*/
        }
        return of(err);
      })
    );
  /*  if (this.globalService.wxSessionGetObject('token')) {
      const clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('token', this.globalService.wxSessionGetObject('token'))
      });
      return next.handle(clonedRequest).pipe(
        mergeMap((event: any, ) => {
          if (event) {
            return of(event);
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
        mergeMap((event: any) => {
          if (event) {
             return of(event);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          this.globalService.remindEvent.next(false);
          if (err.status === 0) {
            this.router.navigate(['/error'], {
              queryParams: {
                msg: '连接服务器失败，请检查网络！',
                url: null,
                btn: '请重试',
              }});
          }
          if (err.status === 403) {
            this.router.navigate(['/error'], {queryParams: {status: 403, msg: 'token认证失败！', url: null}});
          }
          if (err.status === 400) {
            return of(err);
          }
          if (err.status === 500) {
            this.router.navigate(['/error'], {
              queryParams: {
                msg: '服务器处理失败！请联系管理员',
                url: null,
                btn: '请重试',
              }});
          }
        })
      );
    }*/
  }
}
