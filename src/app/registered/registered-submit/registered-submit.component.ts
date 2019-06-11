import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DialogComponent, DialogConfig, SkinType, DialogService, ToastService, ToptipsService} from 'ngx-weui';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {map, mergeMap} from 'rxjs/operators';
import {EMPTY, Observable, timer} from 'rxjs';
import {environment} from '../../../environments/environment';
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
  public dialogPayConfig = new DialogPay('设置支付密码', true, ['', '', '', '', '', ''], false, false, false);
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
    this.toastService['loading']('请求中...');
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
          return EMPTY;
        }
      })
    )
    .subscribe(
      (val) => {
        this.toastService.hide();
        if (val.status === 200) {
          this.regSubmit.nikeName = val.nickname;
          this.regSubmit.headImage = val.headimgurl;
          this.regSubmit.sex = val.sex;
          this.regSubmit.address = val.country;
          this.dialogPayShow = true;
          return;
        }
        this.topSrv['warn']('获取微信信息失败');
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
    this.regSrv.regRegister(this.regSubmit).pipe(
      mergeMap((res) => {
        if (res.status === 200) {
          this.workId = res.data.workId;
          return this.regSrv.regLanding({wxid: res.data.wxid});
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `注册失败！错误码${res.status}`,
              url: null,
              btn: '请重试',
            }});
        }
      })
    ).subscribe(
      (val) => {
        if (val.status === 200) {
          this.globalSrv.wxSessionSetObject('token', val.token);
          this.router.navigate(['/registered/success'], {
            queryParams: {
              workId: `${this.workId}`,
            }
          });
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: 'token认证失败，请重新登陆！',
              url: `${environment.wx_api}?appid=${environment.wx_appid}&redirect_uri=${environment.wx_redirect_uri}&response_type=${environment.wx_response_type}&scope${environment.wx_scope}=&state=${environment.wx_state}`,
              btn: '点击登陆'
            }});
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
