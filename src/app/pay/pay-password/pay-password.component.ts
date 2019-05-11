import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ToastComponent} from 'ngx-weui';
import {PwdDialogPay} from '../../mine/mine-setting/setting-paypwd/setting-paypwd.component';
@Component({
  selector: 'app-pay-password',
  templateUrl: './pay-password.component.html',
  styleUrls: ['./pay-password.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PayPasswordComponent implements OnInit {
  // toast
  @ViewChild('success') successToast: ToastComponent;
  // header
  public headerOption: HeaderContent = {
    title: '忘记支付密码',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {}
  };
  // payDialog
  public inputShow = false;
  public passwordShow = false;
  public errorShow = false;
  public inputPws: any;
  public inputFirePws: any;
  public passwordConfig = new PwdDialogPay(true, ['', '', '', '', '', '']);
  public firpasswordConfig = new PwdDialogPay(true, ['', '', '', '', '', '']);
  public password: any = {
    password: '',
    firpassword: ''
  };
  constructor() { }

  ngOnInit() {}
  public onPsswordInput(event): void {
    this.errorShow = false;
    if (event.target.value.length > 6) {
      event.target.value =  this.inputPws;
      return;
    }
    this.passwordConfig.value = ['', '', '', '', '', ''];
    this.passwordConfig.inputDisabled = false;
    this.inputPws = event.target.value;
    for (let i = 0; i < this.inputPws.length; i++) {
      this.passwordConfig.value[i] = '❂';
    }
    if (this.inputPws.length === 6) {
      this.inputShow = true;
      this.passwordShow = true;
      this.passwordConfig.inputDisabled = true;
      setTimeout(() => {
        this.inputShow = false;
      }, 50);
    }
  }
  public onFirePsswordInput(event): void {
    if (event.target.value.length > 6) {
      event.target.value =  this.inputFirePws;
      return;
    }
    this.firpasswordConfig.value = ['', '', '', '', '', ''];
    this.firpasswordConfig.inputDisabled = false;
    this.inputFirePws = event.target.value;
    for (let i = 0; i < this.inputFirePws.length; i++) {
      this.firpasswordConfig.value[i] = '❂';
    }
    if (this.inputFirePws.length === 6) {
      this.inputShow = true;
      this.firpasswordConfig.inputDisabled = true;
      if (this.inputPws === this.inputFirePws) {
        this.onToastShow('success');
        console.log(this.inputPws);
        console.log(this.inputFirePws);
      } else {
        this.errorShow = true;
      }
      setTimeout(() => {
        console.log('11111');
        this.inputShow = false;
        this.passwordShow = false;
        this.inputPws = null;
        this.inputFirePws = null;
        this.firpasswordConfig.value = ['', '', '', '', '', ''];
        this.passwordConfig.value = ['', '', '', '', '', ''];
      }, 50);
    }
  }
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
