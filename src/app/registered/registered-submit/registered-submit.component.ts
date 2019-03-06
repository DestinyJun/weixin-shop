import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {DialogComponent, DialogConfig, SkinType, DialogService, ToastService} from 'ngx-weui';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {RegisteredService} from '../../common/services/registered.service';

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
  public dialogPayConfig = new DialogPay('请输入六位数密码', true, ['', '', '', '', '', ''], false, true, false);
  // code
  public codeError = false;
  public submitPhone: any = {
    phone: '',
    smsCode: '',
  };
  public submitAgree = false;
  // btn code
  constructor(
    private srv: DialogService,
    private toastService: ToastService,
    private router: Router,
    private registeredService: RegisteredService
  ) {}

  ngOnInit() {}
  public codeBtnClick() {
    this.registeredService.verifyPhone(this.submitPhone).subscribe(
      (val) => {
         if (val.status == 200) {
           console.log(val);
         }
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
  public onDialogPayClick(event): void {
    this.dialogPayShow = event.show;
    if (event.password === 'destroy') {
      return;
    }
    if (event.password === '123456') {
      this.router.navigate(['/registered/success']);
    }
  }
  public onsubmit(): void {
    this.registeredService.verifyCode(this.submitPhone).subscribe(
      (val) => {
        console.log(val);
        if (val.status == 200) {
          this.dialogPayShow = true;
        } else {
          this.codeError = true;
          this.submitPhone.smsCode = '';
        }
      }
    );
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
}
