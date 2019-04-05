import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
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
      headers: req.headers.set('Content-type', 'application/json; charset=UTF-8')
        .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODk4NDU5NzM5MyIsImV4cCI6MTU1NDQ2NzAyMH0.Bui32VvLOPU1Z-1fTeW7-RyhPv7BeB5dq3jNJlVqAiMjkyWgmCwz22snUGdfKGz4cdLq9OFPijakk5KDSkCuvQ')
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

  /*mergeMap((event: any) => {
       this.globalService.remindEvent.next({type: 'loading'});
      /!* if (event instanceof HttpResponse && event.status === 200) {
         // return this.handleData(event); // 具体处理请求返回数据
         return Observable.create(observer => observer.next(event)); // 请求成功返回响应
       }*!/
       // return Observable.create(observer => observer.next(event)); // 请求成功返回响应
       console.log(event);
       if (event instanceof HttpResponse && event.status === 200) {
         this.globalService.remindEvent.next({type: 'loading', close: true});
       }
       return Observable.create(observer => observer.next(event)); // 请求成功返回响应
     }),*/
/*  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    console.log(event);
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          if (body && body.status === 200) {
            return Observable.create(observer => observer.next(event.body));
          } else if (body && body.status === 403) {
            console.log('未授权');
          } else if (body && body.status === 40001) {
            console.log('参数错误或者为空');
          } else if (body && body.status === 40002) {
            console.log('操作失败');
          } else if (body && body.status === 40003) {
            console.log('安全错误、必须先通过验证码验证');
          } else if (body && body.status === 40004) {
            console.log('查询不到数据');
          } else if (body && body.status === 40005 ) {
            console.log('参数不符合规则');
          } else if (body && body.status === 40006 ) {
            console.log('验证码验证失败');
          } else if (body && body.status === 40007 ) {
            console.log('下单失败，请联系后台人员');
          } else if (body && body.status === 40008 ) {
            console.log('支付密码验证错误');
          } else if (body && body.status === 40009 ) {
            console.log('余额不足');
          } else if (body && body.status === 40010 ) {
            console.log('支付密码过时');
          } else if (body && body.status === 40011 ) {
            console.log('订单状错误');
          }
        }
        break;
      case 401:
        console.log('401错误');
        break;
      case 404:
        console.log('找不到服务器');
        break;
      case 500:
        console.log('500错误');
          break;
      default:
        return of(event);
    }
  }*/

  /* if (event.body && event.body.status === 200) {
        return event;
      } else if (event.body && event.body.status === 403) {
        console.log('未授权');
      } else if (event.body && event.body.status === 40001) {
        console.log('参数错误或者为空');
      } else if (event.body && event.body.status === 40002) {
        console.log('操作失败');
      } else if (event.body && event.body.status === 40003) {
        console.log('安全错误、必须先通过验证码验证');
      } else if (event.body && event.body.status === 40004) {
        console.log('查询不到数据');
        return event;
      } else if (event.body && event.body.status === 40005 ) {
        console.log('参数不符合规则');
      } else if (event.body && event.body.status === 40006 ) {
        console.log('验证码验证失败');
      } else if (event.body && event.body.status === 40007 ) {
        console.log('下单失败，请联系后台人员');
      } else if (event.body && event.body.status === 40008 ) {
        console.log('支付密码验证错误');
      } else if (event.body && event.body.status === 40009 ) {
        console.log('余额不足');
      } else if (event.body && event.body.status === 40010 ) {
        console.log('支付密码过时');
      } else if (event.body && event.body.status === 40011 ) {
        console.log('订单状错误');
      }*/
}
