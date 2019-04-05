import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public loading = false;
  public title = '魔药系统';
  public msg: string;
  constructor(
    private router: Router,
    private globalSrv: GlobalService,
    private http: HttpClient
  ) {
    const title = {
      '/registered': '请填写推荐人',
    };
    console.log(environment.env);
   /* router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          titleSrv.setTitle(title[event.urlAfterRedirects]);
        }
      }
    );*/
    globalSrv.remindEvent.subscribe(
      (val: any) => {
        if (val) {
          this.loading = true;
        } else {
          this.loading = false;
        }

      }
    );
   /* this.http.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbacad0ba65a80a3d&secret=0dcc3e618ace474a48e811988d724c6d').subscribe(
      (val) => {
        console.log(val);
      }
    );*/
  }
}
