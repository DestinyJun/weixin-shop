import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {GlobalService} from './global.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public clonedRequest: any;
  public skipAuth = [
    `/login`, '/wx/getOauth', '/wx/userinfo',
    '/orderPay/orderWxPay', '/wx/gettoken', '/imageFileUpload',
    '/wx/getticket', '/member/signin', '/member/recommenderWorkId',
    '/member/sendSMS', '/member/verifySMS'
  ];
  constructor(
    private globalService: GlobalService,
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.production) {
      return this.prod_http(req, next);
    } else {
      return this.debug_http(req, next);
    }
  }
  // debug http
  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isSkipAuth(req.url)) {
      this.clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
      });
    } else {
      this.clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
          .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU2MTM5MjE2NH0.tv8c3-sQb5c2QTCAbFwAXxfi_YlEPwkNvcDNdzXz4PHVRlrw4vUvChwBcMRDl-wow8BrKs-kA1OxvaQNK7rstg')
      });
    }
    return next.handle(this.clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          if (event.body.status === 200) {
            return of(event);
          }
          if (event.body.errcode) {
            this.router.navigate(['/error'], {
              queryParams: {
                msg: `${event.body.errmsg}`,
                url: null,
                btn: '请联系管理员',
              }});
            return EMPTY;
          }
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `${event.body.message}错误码：${event.body.status}`,
              url: null,
              btn: '请重试',
            }});
          return EMPTY;
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        this.handle_error(err);
        return EMPTY;
      })
    );
  }
  // prod http
  public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isSkipAuth(req.url)) {
      this.clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
      });
    } else {
      if (!this.globalService.wxSessionGetObject('token')) {
        this.router.navigate(['/error'], {
          queryParams: {
            msg: '登陆失效，请重新登陆！',
            url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbacad0ba65a80a3d&redirect_uri=${environment.dev_test_url}/moyaoView/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
            btn: '点击登陆'
          }});
        return EMPTY;
      }
      this.clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('token', this.globalService.wxSessionGetObject('token'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          if (event.body.status === 200) {
            return of(event);
          }
          if (event.body.errcode) {
            this.router.navigate(['/error'], {
              queryParams: {
                msg: `${event.body.errmsg}`,
                url: null,
                btn: '请联系管理员',
              }});
            return EMPTY;
          }
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `${event.body.message}错误码：${event.body.status}`,
              url: null,
              btn: '请重试',
            }});
          return EMPTY;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.handle_error(err);
        return EMPTY;
      })
    );
  }
  // handle error
  public handle_error(err): void {
    if (err.status === 0 || err.status === 400) {
      this.router.navigate(['/error'], {
        queryParams: {
          msg: '连接服务器失败，请检查网络或联系管理员！',
          url: null,
          btn: '请重试',
        }});
    }
    if (err.status === 403) {
      this.router.navigate(['/error'], {
        queryParams: {
          msg: 'token认证失败，请重新登陆！',
          url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbacad0ba65a80a3d&redirect_uri=${environment.dev_test_url}/moyaoView/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
          btn: '点击登陆'
        }});
    }
    if (err.status === 500) {
      this.router.navigate(['/error'], {
        queryParams: {
          msg: '服务器挂了！请联系管理员',
          url: null,
          btn: '请重试',
        }});
    }
  }
  // is skip url
  public isSkipAuth(url: string) {
    return this.skipAuth.includes(url);
  }
  /*
   if (req.url.indexOf('imageFileUpload') >= 0) {
      this.clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
      });
      return next.handle(this.clonedRequest).pipe(
        mergeMap((event: any) => {
          if (event.status === 200) {
            return of(event);
          }
          return EMPTY;
        }),
        catchError((err: HttpErrorResponse) => {
          this.handle_error(err);
          return EMPTY;
        })
      );
    }
  * */
}
