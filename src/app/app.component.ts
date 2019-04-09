import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {mergeMap} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public loading = false;
  public title = '魔药系统';
  public msg: string;
  public wx_openid: string;
  public urltest = 'http://1785s28l17.iask.in/moyaoView/?code=0810raqM1IS7j81LEctM1EpcqM10raqa&state=STATE';
  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private globalSrv: GlobalService,
    private http: HttpClient,
    private location: Location
  ) {
    const title = {
      '/registered': '请填写推荐人',
    };
    console.log(environment.env);
    console.log(location.path());
    if (location.path() && location.path().split('?')[1] !== undefined) {
      if (location.path().split('?')[1].split('=')[0] === 'code') {
        const wx_url = '/sns/oauth2/access_token?';
        const wx_appid = 'wxda47c8b3a3d7fdcc';
        const wx_secret = 'f6fe4d42a7bcb9279d9c524e7ce58d84';
        const wx_code = location.path().split('?')[1].split('=')[1].split('&')[0];
        const wx_grant_type = 'authorization_code';
        this.http.get(`${wx_url}appid=${wx_appid}&secret=${wx_secret}&code=${wx_code}&grant_type=${wx_grant_type}`)
          .pipe(mergeMap((props: any) => {
            console.log(props);
            this.wx_openid =  props.openid;
            return this.http.post('/login', {wxid: props.openid});
          }))
          .subscribe(
          (val: any) => {
            if (val.token) {
              this.router.navigate(['/tab']);
            } else {
              this.router.navigate(['/registered', {queryParams: {wx_openid:  this.wx_openid}}]);
            }
          }
        );
      }
    }
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
         /* titleSrv.setTitle(title[event.urlAfterRedirects]);*/
        }
      }
    );
    globalSrv.remindEvent.subscribe(
      (val: any) => {
        if (val) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      }
    );
  }
}
