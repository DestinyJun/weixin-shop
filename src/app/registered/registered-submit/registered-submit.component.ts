import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DialogComponent, DialogConfig, SkinType, DialogService, ToastService, ToptipsService} from 'ngx-weui';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {map, mergeMap} from 'rxjs/operators';
import {Observable, timer} from 'rxjs';
let that: any;

@Component({
  selector: 'app-registered-submit',
  templateUrl: './registered-submit.component.html',
  styleUrls: ['./registered-submit.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredSubmitComponent implements OnInit, OnDestroy {
  // agreeDialog
  @ViewChild('agreeDialog') iosAgreeDialog: DialogComponent;
  public configAgreeDialog: DialogConfig = {};
  // dialogPay
  public dialogPayShow = false;
  public dialogPayConfig = new DialogPay('请设置支付密码', true, ['', '', '', '', '', ''], false, true, false);
  // code
  public codeError = false;
  public smsCode: any = null;
  public regSubmit: any = {
    username: null,
    payPwd: null,
    refereesId: null,
    headImage: null,
    nikeName: null,
    sex: null,
    address: null,
    smsKey: null
  };
  public submitAgree = false;
  constructor(
    private srv: DialogService,
    private toastService: ToastService,
    private router: Router,
    private regSrv: RegisteredService,
    private routerInfo: ActivatedRoute,
    private globalSrv: GlobalService,
    private topSrv: ToptipsService
  ) {}

  ngOnInit() {
    that = this;
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
        this.regSubmit.wxid =  params.openid;
        this.regSubmit.refereesId =  params.workId;
      }
    );
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  // send code
  public codeBtnClick() {
    this.regSrv.regSendSMS({phone: this.regSubmit.username}).subscribe(
      (val) => {
        console.log(val);
         if (val.status === 200) {
           this.topSrv['primary'](val.message);
           return;
         }
        this.topSrv['warn'](val.message);
      }
    );
  }
  // reg submit
  public onsubmit(): void {
    this.regSrv.regVerifySMS({phone: this.regSubmit.username, smsCode: this.smsCode}).pipe(
      mergeMap((val) => {
        if (val.status === 200) {
          this.regSubmit.smsKey = val.backString;
          return this.regSrv.regGetWxUserInfo({
            access_token: this.globalSrv.wxSessionGetObject('access_token'),
            openid: this.globalSrv.wxSessionGetObject('openid')
          });
        } else {
          this.codeError = true;
        }
      })
    )
    .subscribe(
      (val) => {
        if (val) {
          console.log(val);
          this.regSubmit.nikeName = val.nickname;
          this.regSubmit.headImage = val.headimgurl;
          this.regSubmit.sex = val.sex;
          this.regSubmit.address = val.country;
          this.dialogPayShow = true;
        }
      }
    );
  }
  // reg agree
  public dialogAgreeShow(type: SkinType) {
    this.configAgreeDialog = Object.assign({}, <DialogConfig>{
      cancel: null,
      confirm: '同意',
      content: '都会发生记得发货时间快点恢复数据返回数据' +
        '收到附件是风景还是看花费时间客户反馈撒旦解放和' +
        '技术开发会尽快答复函数的积分和捷克首都和封建时代' +
        '回复精神科大夫'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}AgreeDialog`]).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
    return false;
  }
  // set Pay Pwd
  public onDialogPayClick(event): void {
    this.dialogPayShow = event.show;
    if (event.password === 'destroy') {
      return;
    }
    this.regSubmit.payPwd = event.password;
    console.log(this.regSubmit);
    this.regSrv.regRegister(this.regSubmit).pipe(
      mergeMap((res) => {
        console.log(res);
        if (res.status === 200) {
          return this.regSrv.regLanding({wxid: res.data.wxid});
        }
      })
    ).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          this.globalSrv.wxSessionSetObject('token', val.token);
          this.router.navigate(['/registered/success']);
        }
      }
    );
  }
  // btn
  public onSendCode(): Observable<boolean> {
    that.codeBtnClick();
    return timer(1000).pipe(map((v, i) => {
      return true;
    }));
  }
}
