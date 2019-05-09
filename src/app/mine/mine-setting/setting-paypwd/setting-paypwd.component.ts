import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MaskComponent, ToastComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MineService} from '../../../common/services/mine.service';
import {Observable, timer} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {MineSettingService} from '../../../common/services/mine-setting.service';
import {Router} from '@angular/router';
export class PwdDialogPay {
  value?: Array<string>;
  inputDisabled?: boolean;
  constructor(_inputDisabled?: boolean, _value?: Array<string>) {
    this.value = _value;
    this.inputDisabled = _inputDisabled;
  }
}
let that: any;
@Component({
  selector: 'app-setting-paypwd',
  templateUrl: './setting-paypwd.component.html',
  styleUrls: ['./setting-paypwd.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SettingPaypwdComponent implements OnInit {
  // toast
  @ViewChild('success') successToast: ToastComponent;
  public setPwdToastTxt: string;
  // mask
  @ViewChild('maskContent') maskContent: MaskComponent;
  // header
  public headerOption: HeaderContent = {
    title: '修改支付密码',
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
  // dada
  public mobilePhone: any = null;
  public mobilePhoneString: any = null;
  public mineSetMobileSMS: any = null;
  public smsBackString: any = null;
  constructor(
    private mineSrv: MineService,
    private mineSetSrv: MineSettingService,
    private router: Router,
    private topSrv: ToptipsService
  ) { }

  ngOnInit() {
    that = this;
    this.maskContent.show();
    this.minePhoneSetInit();
  }
  // init phone
  public minePhoneSetInit(): void {
    this.mineSetSrv.mineSetUserInfo().subscribe(
      (val) => {
        if (val.status === 200) {
          this.mobilePhone = val.data.phone;
          const phone = this.mobilePhone.split('');
          const phoneLength = this.mobilePhone.split('').length;
          this.mobilePhoneString = `
          ${phone[0]}${phone[1]}${phone[2]} ****
          ${phone[phoneLength - 4]}${phone[phoneLength - 3]}${phone[phoneLength - 2]}${phone[phoneLength - 1]}`;
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `服务器处理失败！错误代码：${val.status}`,
              url: null,
              btn: '请重试',
            }});
        }
      }
    );
  }
  // send sms
  public onSendCode(): Observable<boolean> {
    return that.mineSetSrv.mineSetSendSMS({phone: that.mobilePhone}).pipe(
      mergeMap((val) => {
          console.log(val['status']);
          if (val['status'] === 200) {
            that.topSrv['primary'](val['message']);
            return timer(50).pipe(map((v, i) => true));
          }
          that.topSrv['warn'](val['message']);
          return timer(50).pipe(map((v, i) => false));
        }
      )
    );
  }
  // verify SMS
  public setMobileCodeClick(): void {
    this.mineSetSrv.mineSetVerifySMS({phone: this.mobilePhone, smsCode: this.mineSetMobileSMS}).subscribe(
      (val) => {
        if (val.status === 200) {
          console.log(val);
          this.smsBackString = val.backString;
          this.maskContent.hide();
        } else {
          this.topSrv['warn'](`验证失败，错误代码：${val.status}`);
        }
      }
    );
  }
  // enter pwd
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
  // enter pwd again
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
        this.mineSrv.mineSetPayPwd({payPwd: this.inputFirePws, smsKey: this.smsBackString}).subscribe(
          (val) => {
            console.log(val);
            if (val.status === 200) {
              this.setPwdToastTxt = val.message;
              this.onToastShow('success');
              setTimeout(() => {
                this.inputShow = false;
                this.passwordShow = false;
                this.inputPws = null;
                this.inputFirePws = null;
                this.firpasswordConfig.value = ['', '', '', '', '', ''];
                this.passwordConfig.value = ['', '', '', '', '', ''];
                window.history.back();
              }, 1000);
            } else {
              this.router.navigate(['/error'], {
                queryParams: {
                  msg: `修改失败，请稍后重试，错误代码：${val.status}`,
                  btn: '请重试',
                  url: '/mine/setting'
                }
              });
              this.setPwdToastTxt = val.message;
              this.onToastShow('success');
            }
          }
        );
      } else {
        this.errorShow = true;
      }
    }
  }
  // toast
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
