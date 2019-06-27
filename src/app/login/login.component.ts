import { Component, OnInit } from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GlobalService} from '../common/services/global.service';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../common/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public msg: string;
  public wx_openid: string;
  public workId: any = null;

  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private globalSrv: GlobalService,
    private http: HttpClient,
    private loginSrv: LoginService
  ) { }

  ngOnInit() {
    if (environment.production) {
      if (this.globalSrv.wxSessionGetObject('token')) {
        this.router.navigate(['/tab/home']);
      } else {
        this.appInit();
      }
    }
  }
  public appInit(): void {
    // weixin auth
    this.routerInfo.queryParams.subscribe((params: Params) => {
      // console.log(params);
      if ('workId' in params) {
        this.workId = params.workId;
      }
      if ('code' in params) {
        // wx get ticket
        if (!this.globalSrv.wxSessionGetObject('ticket')) {
          this.getWxTicket(params.code);
        }
        return;
      }
      this.router.navigate(['/error'], {
        queryParams: {
          msg: '非法访问，请先登录！',
          url: `${environment.wx_auth_url}`,
          btn: '点击登录'
        }
      });
    });
  }
  // get wx ticket
  public getWxTicket(wx_code): void {
    this.http.get(`/wx/gettoken`).pipe(
      mergeMap((val) => {
        if (!val['errcode']) {
          this.globalSrv.wxSessionSetObject('js_access_token', val['access_token']);
          return this.loginSrv.loginGetTicket({'access_token': val['access_token']});
        }
        return EMPTY;
      })
    ).subscribe(
      (val) => {
        this.globalSrv.wxSessionSetObject('ticket', val['ticket']);
        this.wxAuth(wx_code);
      }
    );
  }
  // wx auth
  public wxAuth(wx_code): void {
    const wx_param = {
      'appid': environment.wx_appid,
      'secret': environment.wx_secret,
      'code': wx_code,
      'grant_type': environment.wx_grant_type
    };
    this.loginSrv.loginGetOpenid(wx_param)
      .pipe(mergeMap((props) => {
        if (props['openid']) {
          this.wx_openid = props['openid'];
          this.globalSrv.wxSessionSetObject('openid', props['openid']);
          this.globalSrv.wxSessionSetObject('access_token', props['access_token']);
          this.globalSrv.wxSessionSetObject('refresh_token', props['refresh_token']);
          return this.loginSrv.loginAuth({wxid: props['openid']});
        }
      }))
      .subscribe(
        (val) => {
          if (val.status === 40000) {
            if (this.workId) {
              this.router.navigate(['/registered/submit'], {queryParams: {workId: this.workId}});
            } else {
              this.router.navigate(['/registered']);
            }
          } else {
            this.globalSrv.wxSessionSetObject('token', val['token']);
            this.router.navigate(['/tab/home']);
          }
        }
      );
  }
}
