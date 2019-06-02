import { Component, OnInit } from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GlobalService} from '../common/services/global.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public msg: string;
  public wx_openid: string;
  public wx_code: any = null;
  public wx_appid = 'wxbacad0ba65a80a3d';
  public wx_auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  public wx_auth_string = '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private globalSrv: GlobalService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    // this.appInit();
  }
  public appInit(): void {
    // weixin auth
    this.routerInfo.queryParams.subscribe((params: Params) => {
      if ('code' in params) {
        console.log('进来了');
        this.wx_code = params.code;
        this.wxAuth();
      }
    });
    // wx get ticket
    if (!this.globalSrv.wxSessionGetObject('ticket')) {
      this.getWxTicket();
    }
  }
  // wx auth
  public wxAuth(): void {
    if (this.wx_code) {
      const wx_url = '/wx/getOauth?';
      const wx_appid = 'wxbacad0ba65a80a3d';
      const wx_secret = '3dff3ec9e534c308e3b2d5916b4f35e8';
      const wx_grant_type = 'authorization_code';
      this.http.get(`${wx_url}appid=${wx_appid}&secret=${wx_secret}&code=${this.wx_code}&grant_type=${wx_grant_type}`)
        .pipe(mergeMap((props) => {
          if (props['openid']) {
            this.wx_openid = props['openid'];
            this.globalSrv.wxSessionSetObject('openid', props['openid']);
            this.globalSrv.wxSessionSetObject('access_token', props['access_token']);
            this.globalSrv.wxSessionSetObject('refresh_token', props['refresh_token']);
            return this.http.post('/login', {wxid: props['openid']});
          }
          return Observable.create(observer => observer.next({
            status: 40444,
            msg: '微信授权失败，请重新授权！',
            url: `${this.wx_auth_url}?appid=${this.wx_appid}&redirect_uri=${environment.dev_test_url}/moyaoView${this.wx_auth_string}`,
            btn: '点击授权'
          }));
        }))
        .subscribe(
          (val) => {
            if (val['status'] === 40444) {
              this.router.navigate(['/error'], {queryParams: val});
              return;
            }
            if (val['status'] === 200) {
              this.globalSrv.wxSessionSetObject('token', val['token']);
              this.router.navigate(['/tab/home']);
              return;
            }
            if (val['status'] === 40000) {
              this.router.navigate(['/registered']);
              return;
            }
          }
        );
      return;
    }
    this.router.navigate(['/error'], {
      queryParams: {
        msg: '非法访问，请先登录！',
        url: `${this.wx_auth_url}?appid=${this.wx_appid}&redirect_uri=${environment.dev_test_url}/moyaoView${this.wx_auth_string}`,
        btn: '点击登录'
      }
    });
  }
  // get wx ticket
  public getWxTicket(): void {
    this.http.get(`/wx/gettoken`).pipe(
      mergeMap((val) => {
        if (!val['errcode']) {
          console.log(val);
          this.globalSrv.wxSessionSetObject('js_access_token', val['access_token']);
          return this.http.get(`/wx/getticket?access_token=${val['access_token']}`);
        }
        return EMPTY;
      })
    ).subscribe(
      (val) => {
        this.globalSrv.wxSessionSetObject('ticket', val['ticket']);
      }
    );
  }
}