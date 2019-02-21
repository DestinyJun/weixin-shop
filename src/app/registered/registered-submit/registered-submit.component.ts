import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {DialogComponent, DialogConfig, SkinType, DialogService, ToastService} from 'ngx-weui';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-registered-submit',
  templateUrl: './registered-submit.component.html',
  styleUrls: ['./registered-submit.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredSubmitComponent implements OnInit, OnDestroy {
  // agreeDialog组件
  @ViewChild('agreeDialog') iosAgreeDialog: DialogComponent;
  public configAgreeDialog: DialogConfig = {};

  // dialogPay组件
  public dialogPayShow = false;

  public submitStatus: boolean;
  public submitPhone: any;
  public submitCode: any;
  public submitAgree = false;
  public submitPayPassword: any;
  public buttonDisabled = false;
  public dialogPayConfig = new DialogPay(true, ['', '', '', '', '', ''], false, true, false);
  constructor(
    private srv: DialogService,
    private toastService: ToastService,
    private router: Router,
    public titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('注册');
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  public onSendCode(): Observable<boolean> {
    return timer(1000).pipe(map((v, i) => {
      this.submitStatus = true;
      setTimeout(() => {
        this.submitStatus = false;
      }, 3000);
      console.log(v);
      console.log(i);
      return this.submitStatus;
    }));
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
    this.dialogPayShow = true;
  }
  public onForm() {
    this.buttonDisabled = false;
    if ((this.submitPhone !== undefined) && (this.submitCode !== undefined) && this.submitAgree) {
      this.buttonDisabled = true;
      return;
    }
  }
}
