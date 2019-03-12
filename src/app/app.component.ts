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
  // toast
  @ViewChild('statusRemindToast') statusRemindToast: ToastComponent;
  title = 'weixin-shop';
  msg: string;
  constructor(
    private router: Router,
    private globalSrv: GlobalService,
    private toastSrv: ToastService
  ) {
    // this.toastSrv.loading('删除中...');
    // this.toastSrv.hide();

    // this.msg = val.message;
    // this.onShow('statusRemind');
    console.log(environment.env);
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event.urlAfterRedirects);
        }
      }
    );
    globalSrv.remindEvent.subscribe(
      (val: any) => {
        // this.toastSrv.loading(val.msg);
        console.log(val);
      }
    );
  }
  public appRemindToast(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
