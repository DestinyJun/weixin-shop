import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DialogComponent, DialogConfig, SkinType, DialogService, ToastService, ToptipsService} from 'ngx-weui';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {map, mergeMap} from 'rxjs/operators';
import {EMPTY, Observable, timer} from 'rxjs';
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
  // pay mask
  public inputPws: any;
  public inputPwsTimer: any;
  public dialogPayShow = false;
  public config = {
    title: '请输入支付密码',
    value: ['', '', '', '', '', '']
  };
  @ViewChild('passwordInput') passwordInput: ElementRef;
  // code
  public codeError = false;
  public smsCode: any = null;
  public regSubmit: any = {
    username: null,
    payPwd: null,
    refereesId: null,
    wxid: null,
    headImage: null,
    nikeName: null,
    sex: null,
    address: null,
    smsKey: null
  };
  public workId: string = null;
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
    this.regSubmit.wxid = this.globalSrv.wxSessionGetObject('openid');
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
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
         if (val.status === 200) {
           this.topSrv['primary'](val.message);
           return;
         }
        this.topSrv['warn'](val.message);
      }
    );
  }
  // reg submit
  public onsubmit(type: string): void {
    if (type === 'submit') {
      this.dialogPayShow = true;
      this.passwordInput.nativeElement.focus();
      return;
    }
    this.passwordInput.nativeElement.focus();
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
      });
    }, 10);
    return false;
  }
  // btn
  public onSendCode(): Observable<boolean> {
    return timer(50).pipe(map((v, i) => {
      that.codeBtnClick();
      return true;
    }));
  }
  // pay mask
  public onSelfDestroy(): void {
    this.inputPws = null;
    this.config.value = ['', '', '', '', '', ''];
    this.dialogPayShow = false;
  }
  public onInput(event): void {
    if (event.target.value.length > 6) {
      event.target.value =  this.inputPws;
      return;
    }
    this.config.value = ['', '', '', '', '', ''];
    this.inputPws = event.target.value;
    for (let i = 0; i < this.inputPws.length; i++) {
      this.config.value[i] = '#5E5E5E';
    }
    if (this.inputPws.length === 6) {
      this.config.value = ['', '', '', '', '', ''];
      this.regVerify(this.inputPws);
      this.inputPwsTimer = setTimeout(() => {
        this.inputPws = null;
      }, 50);
    }
  }
  public regVerify(password): void {
    this.toastService['loading']('请求中...');
    this.regSrv.regVerifySMS({phone: this.regSubmit.username, smsCode: this.smsCode}).pipe(
      mergeMap((val) => {
        this.regSubmit.smsKey = val.backString;
        return this.regSrv.regGetWxUserInfo({
          access_token: this.globalSrv.wxSessionGetObject('access_token'),
          openid: this.globalSrv.wxSessionGetObject('openid')
        });
      })
    )
      .subscribe(
        (val) => {
          this.toastService.hide();
          this.regSubmit.nikeName = val.nickname;
          this.regSubmit.headImage = val.headimgurl;
          this.regSubmit.sex = val.sex;
          this.regSubmit.address = val.country;
          this.onDialogPayClick(password);
        }
      );
  }
  public regBlur() {
    this.inputPws = null;
    this.config.value = ['', '', '', '', '', ''];
  }
  public onDialogPayClick(password): void {
    this.dialogPayShow = false;
    this.regSubmit.payPwd = password;
    this.regSrv.regRegister(this.regSubmit).pipe(
      mergeMap((res) => {
        this.workId = res.data.workId;
        return this.regSrv.regLanding({wxid: res.data.wxid});
      })
    ).subscribe(
      (val) => {
        this.globalSrv.wxSessionSetObject('token', val.token);
        this.router.navigate(['/registered/success'], {
          queryParams: {
            workId: `${this.workId}`,
          }
        });
      }
    );
  }
}
