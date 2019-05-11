import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
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
    let clonedRequest;
    clonedRequest = req.clone({
      url: environment.dev_test_url + req.url,
      // url: 'http://192.168.1.88' + req.url,
      headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY4NTQ4ODA4NCIsImV4cCI6MTU1NzYyOTM5Nn0.aOZdEIjRB_j_POoYDgx82b7Yc293ZOXeOAxuyeO0YI-h90MQh6HBwVU_iHirHlq7mibBnuK7XsXXk-k8VbSNfQ')
    });
    return next.handle(clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          return of(event);
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              url: null,
              btn: '请重试'
            }
          });
        }
        return EMPTY;
      })
    );
    /*if (this.globalService.wxSessionGetObject('token')) {
      clonedRequest = req.clone({
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
          if (err.status === 0) {
            this.router.navigate(['/error']);
          }
          return Observable.create(observer => observer.next(err));
        })
      );
    }
    clonedRequest = req.clone({
      url: environment.dev_test_url + req.url,
      headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
    });
    return next.handle(clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          return of(event);
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              url: null,
              btn: '请重试',
            }});
        }
        if (err.status === 403) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: 'token认证失败，请重新登陆！',
              url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbacad0ba65a80a3d&redirect_uri=http://1785s28l17.iask.in/moyaoView&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
              btn: '点击登陆'
            }});
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
    );*/
  }
}
