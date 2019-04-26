import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
declare const wx: any;
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
            console.log(props);
            if (props['openid']) {
            /*  wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: '', // 必填，公众号的唯一标识
                timestamp: , // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '',// 必填，签名
                jsApiList: [] // 必填，需要使用的JS接口列表
              });
              wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res);
              });*/
              this.wx_openid = props['openid'];
              this.globalSrv.wxSessionSetObject('openid', props['openid']);
              this.globalSrv.wxSessionSetObject('access_token', props['access_token']);
              this.globalSrv.wxSessionSetObject('refresh_token', props['refresh_token']);
             /* this.http.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${props['access_token']}&type=jsapi`).subscribe(
                (val) => {
                  console.log(val);
                }
              );*/
            /*  wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxbacad0ba65a80a3d', // 必填，公众号的唯一标识
                timestamp: '', // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '', // 必填，签名
                jsApiList: [] // 必填，需要使用的JS接口列表
              });
              wx.ready(function(res) {
                console.log(res);
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
              });
              wx.error(function(err) {
                console.log(err);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              });*/
              return this.http.post('/login', {wxid: props['openid']});
            }
            return Observable.create(observer => observer.next({
              status: 40444, msg: '微信授权失败，请重新授权！',
              url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxda47c8b3a3d7fdcc&redirect_uri=http://1785s28l17.iask.in/moyaoView&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'}));
          }))
          .subscribe(
            (val) => {
              console.log(val);
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
     /* this.router.navigate(['/error'], {
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
