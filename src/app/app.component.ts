import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public loading = false;
  public title = '魔药系统';
  public msg: string;
  public wx_openid: string;
  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private globalSrv: GlobalService,
    private http: HttpClient,
    private location: Location,
  ) {
    const title = {
      '/registered': '请填写推荐人',
    };

  }
  ngOnInit(): void {
    console.log(environment.env);
    console.log('111');
    /*if (window.navigator.userAgent.indexOf('MicroMessenger') === -1) {
      this.router.navigate(['/error']);
      return;
    }*/
    if (this.location.path() && this.location.path().split('?')[1] !== undefined) {
      if (this.location.path().split('?')[1].split('=')[0] === 'code') {
        const wx_url = '/wx/getOauth?';
        const wx_appid = 'wxbacad0ba65a80a3d';
        const wx_secret = '3dff3ec9e534c308e3b2d5916b4f35e8';
        const wx_code = this.location.path().split('?')[1].split('=')[1].split('&')[0];
        const wx_grant_type = 'authorization_code';
        this.http.get(`${wx_url}appid=${wx_appid}&secret=${wx_secret}&code=${wx_code}&grant_type=${wx_grant_type}`)
          .pipe(mergeMap((props) => {
            if (props['openid']) {
              this.wx_openid = props['openid'];
              this.globalSrv.wxSessionSetObject('openid', props['openid']);
              return this.http.post('/login', {wxid: props['openid']});
            }
            return Observable.create(observer => observer.next({
              status: 40444, msg: '微信授权失败，请重新授权！',
              url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxda47c8b3a3d7fdcc&redirect_uri=http://1785s28l17.iask.in/moyaoView&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'}));
          }))
          .subscribe(
            (val) => {
              if (val['status'] === 40444) {
                this.router.navigate(['/error'], {queryParams: val});
                return;
              }
              if (val['status'] === 200) {
                this.globalSrv.wxSessionSetObject('token', val['token']);
                this.router.navigate(['/tab']);
                return;
              }
              this.router.navigate(['/registered'], {queryParams: {openid: this.wx_openid}});
            }
          );
      }
    } else {
      /*this.router.navigate(['/error'], {
        queryParams: {
          msg: '非法访问，请先登录！',
          url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxda47c8b3a3d7fdcc&redirect_uri=http://1785s28l17.iask.in/moyaoView&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
          btn: '点击登录'
        }});*/
    }
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          /* titleSrv.setTitle(title[event.urlAfterRedirects]);*/
        }
      }
    );
    this.globalSrv.remindEvent.subscribe(
      (val: any) => {
        console.log(val);
        if (val) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      }
    );
  }
}
