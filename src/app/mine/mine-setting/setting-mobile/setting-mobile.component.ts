import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastComponent, ToptipsService} from 'ngx-weui';
import {HeaderContent} from '../../../common/components/header/header.model';
import {EMPTY, Observable, timer} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {MineSettingService} from '../../../common/services/mine-setting.service';
import {Router} from '@angular/router';
let that: any;
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
  public oldPhoneCode: any = null;
  public oldPhoneCodeString: any = null;
  public mineSetSMS: any = null;
  public newPhone: any = null;
  public inputToggle = true;
  constructor(
    private mineSetSrv: MineSettingService,
    private router: Router,
    private topSrv: ToptipsService
  ) { }

  ngOnInit() {
    that = this;
    this.mineSetInit();
  }
  public mineSetInit(): void {
    this.mineSetSrv.mineSetUserInfo().subscribe(
      (val) => {
        if (val.status === 200) {
          this.oldPhoneCode = val.data.phone;
          const phone = this.oldPhoneCode.split('');
          const phoneLength = this.oldPhoneCode.split('').length;
          this.oldPhoneCodeString = `
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
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  public onSendCodeOld(): Observable<boolean> {
    console.log(that.oldPhoneCode);
    that.mineSetSrv.mineSetSendSMS({phone: that.oldPhoneCode}).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          that.topSrv['primary'](val.message);
          return;
        }
        that.topSrv['warn'](val.message);
      }
    );
    return timer(1000).pipe(map((v, i) => true));
  }
  public onSendCodeNew(): Observable<boolean> {
    console.log(that.newPhone);
    that.mineSetSrv.mineSetSendSMS({phone: that.newPhone}).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          that.topSrv['primary'](val.message);
          return;
        }
        that.topSrv['warn'](val.message);
      }
    );
    return timer(1000).pipe(map((v, i) => true));
  }
  public inputToggleClick(type: 1 | 2) {
    switch (type) {
      case 1:
        this.mineSetVerifySMS(this.oldPhoneCode, this.mineSetSMS).subscribe(
          (val) => {
            if (val.status === 200) {
              this.oldPhoneCode = null;
              this.mineSetSMS = null;
              this.inputToggle = false;
            } else {
              this.topSrv['warn'](`验证失败，错误代码：${val.status}`);
            }
          }
        );
        break;
      case 2:
        this.mineSetVerifySMS(this.newPhone, this.mineSetSMS).pipe(
          mergeMap((val) => {
            console.log(val);
              if (val.status === 200) {
                return this.mineSetSrv.mineSetUpdatePhone({username: this.newPhone, smsKey: val.backString});
              } else {
                this.topSrv['warn'](`验证失败，错误代码：${val.status}`);
                return EMPTY;
              }
            })
        )
          .subscribe((val) => {
            if (val.status !== 200) {
              window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbacad0ba65a80a3d&redirect_uri=http://1785s28l17.iask.in/moyaoView&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            } else {
              this.router.navigate(['/error'], {
                queryParams: {
                  msg: `服务器处理失败！错误代码：${val.status}`,
                  url: null,
                  btn: '请重试',
                }});
            }
          });
    }
  }
  // verify SMS
  public mineSetVerifySMS(phone, smsCode): Observable<any> {
    return this.mineSetSrv.mineSetVerifySMS({phone: phone, smsCode: smsCode});
  }
}
