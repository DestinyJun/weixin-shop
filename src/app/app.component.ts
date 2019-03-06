import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {ToastComponent, ToastService} from 'ngx-weui';
import {GlobalService} from './common/services/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'weixin-shop';
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private srv: ToastService
  ) {
    console.log(environment.env);
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event.urlAfterRedirects);
        }
      }
    );
    globalService.remindEvent.subscribe(
      (val: any) => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('完成');
      }
    );
  }
  onShowBySrv(type: 'success' | 'loading', msg) {
     if (type === 'loading') {
       this.srv.loading(null, 0);
       return;
     }
    this.srv.success(msg);
  }
  onHide() {
    console.log('11');
    this.srv.hide();
  }
}
