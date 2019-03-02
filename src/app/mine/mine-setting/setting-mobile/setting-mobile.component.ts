import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastComponent} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-setting-mobile',
  templateUrl: './setting-mobile.component.html',
  styleUrls: ['./setting-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SettingMobileComponent implements OnInit {
  // toast
  @ViewChild('success') successToast: ToastComponent;
  // header
  public headerOption: HeaderContent = {
    title: '更换绑定手机号',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {}
  };
  // code
  public oldPhoneCode: number;
  public newPhoneCode: number;
  public newPhoneNumber: number;
  public inputToggle = true;
  constructor() { }

  ngOnInit() {}
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  public onSendCode(): Observable<boolean> {
    return timer(1000).pipe(map((v, i) => true));
  }
  public inputToggleClick(type: 1 | 2) {
    switch (type) {
      case 1:
        this.oldPhoneCode = null;
        this.inputToggle = false;
        break;
      case 2:
        this.newPhoneCode = null;
        this.onToastShow('success');
    }
  }
}
