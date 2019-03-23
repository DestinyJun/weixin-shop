import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {MaskComponent, ToastComponent, ToastService} from 'ngx-weui';
import {GlobalService} from './common/services/global.service';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  // mask loading
  @ViewChild('mask') mask: MaskComponent;
  public loading = false;
  // toast
  @ViewChild('statusRemindToast') statusRemindToast: ToastComponent;
  public title = '魔药系统';
  public msg: string;
  constructor(
    private router: Router,
    private globalSrv: GlobalService,
    private toastSrv: ToastService,
    private titleSrv: Title
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
          this.showMask();
        } else {
          this.closeMask();
        }
        // this.toastSrv.loading(val.msg);
      }
    );
    // this.toastSrv.loading('删除中...');
    // this.toastSrv.hide();
    // this.msg = val.message;
    // this.onShow('statusRemind');
  }
  public appRemindToast(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  public showMask() {
    this.mask.show();
    this.loading = true;
  }
  public closeMask (): void {
    this.mask.hide();
  }
}
