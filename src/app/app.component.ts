import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {ToastComponent} from 'ngx-weui';
import {GlobalService} from './common/services/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public remindMsg: string;
  @ViewChild('success') successToast: ToastComponent;
  @ViewChild('failure') failureToast: ToastComponent;
  @ViewChild('loading') loadingToast: ToastComponent;
  title = 'weixin-shop';
  constructor(
    private router: Router,
    private globalService: GlobalService
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
      (val) => {
        console.log(val);
        this.remindMsg = val.msg;
        this.onShow(val.type);
      }
    );
  }
  onShow(type: 'success' | 'loading' | 'failure') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
