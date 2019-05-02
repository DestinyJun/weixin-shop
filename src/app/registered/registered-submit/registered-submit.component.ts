import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DialogComponent, DialogConfig, SkinType, DialogService, ToastService} from 'ngx-weui';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

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
  ) {}

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
        this.regSubmit.wxid =  params.openid;
        this.regSubmit.refereesId =  params.workId;
      }
    );
  }
  // send code
  public codeBtnClick() {
    this.regSrv.regSendSMS({phone: this.regSubmit.username}).subscribe(
      (val) => {
         if (val.status === 200) {}
      }
    );
  }
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
    this.regSrv.regSignin(this.regSubmit).pipe(
      mergeMap((res) => {
        console.log(res);
        return this.regSrv.regLanding({wxid: res.data.wxid});
      })
    ).subscribe(
      (val) => {
        if (val.status === 200) {
          this.globalSrv.wxSessionSetObject('token', val.token);
          this.router.navigate(['/registered/success']);
        }
      }
    );
  }
  // reg submit
  public onsubmit(): void {
    this.regSrv.regVerifySMS({phone: this.regSubmit.username, smsCode: this.smsCode}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.regSubmit.smsKey = val.backString;
          console.log(this.regSubmit);
          this.regSrv.regGetWxUserInfo({
            access_token: this.globalSrv.wxSessionGetObject('access_token'),
            openid: this.globalSrv.wxSessionGetObject('openid')
          }).subscribe(
            (item) => {
              console.log(item);
              if (val.status === 200) {
                console.log(item);
                this.regSubmit.nikeName = item.data.nikeName;
                this.regSubmit.headImage = item.data.headimgurl;
                this.regSubmit.sex = item.data.sex;
                this.regSubmit.address = item.data.country;
                console.log(this.regSubmit);
                this.dialogPayShow = true;
                return EMPTY;
              }
            }
          );
        } else {
          this.codeError = true;
        }
      }
    );
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
}
