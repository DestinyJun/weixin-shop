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
  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('imageFileUpload') >= 0) {
      this.clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        // url: 'http://192.168.1.88' + req.url,
      });
      return next.handle(this.clonedRequest).pipe(
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
    }
    this.clonedRequest = req.clone({
      url: environment.dev_test_url + req.url,
      // url: 'http://192.168.1.88' + req.url,
      headers: req.headers
        .set('Content-type', 'application/json')
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU2MTEwNTEwOX0.PNtT0Huo7P2-vZIN74nb9KJOWKZ9iYxgrZZsx5H6iR7t8gCj9kYIRBxEoAbyG-2W4dpq63gfjf50undxd6ldDw')
    });
    return next.handle(this.clonedRequest).pipe(
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
  }
  public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
          if (err.status === 0) {
            this.router.navigate(['/error'], {
              queryParams: {
                msg: '连接服务器失败，请检查网络！',
                url: null,
                btn: '请重试'
              }
            });
          }
          if (err.status === 500) {
            this.router.navigate(['/error'], {
              queryParams: {
                msg: '图片上传失败，请重试！',
                url: null,
                btn: '请重试'
              }
            });
          }
          return EMPTY;
        })
      );
    }
    if (this.globalService.wxSessionGetObject('token')) {
      this.clonedRequest = req.clone({
        url: environment.dev_test_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('token', this.globalService.wxSessionGetObject('token'))
      });
      return next.handle(this.clonedRequest).pipe(
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
    this.clonedRequest = req.clone({
      url: environment.dev_test_url + req.url,
      headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
    });
    return next.handle(this.clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          return of(event);
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        if (!this.globalService.wxSessionGetObject('token')) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '登陆失效，请重新登陆！',
              url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbacad0ba65a80a3d&redirect_uri=${environment.dev_test_url}/moyaoView/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
              btn: '点击登陆'
            }});
          return;
        }
        if (err.status === 0) {
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
        if (err.status === 400) {
          return of(err);
        }
        if (err.status === 500) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '服务器挂了！请联系管理员',
              url: null,
              btn: '请重试',
            }});
        }
      })
    );
  }
}
