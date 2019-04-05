import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';
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
  }
}
