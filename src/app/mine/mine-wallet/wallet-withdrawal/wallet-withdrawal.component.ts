import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {Router} from '@angular/router';
import {DialogPay} from '../../../common/components/dialog-pay/dialog-pay.component';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';

@Component({
  selector: 'app-wallet-withdrawal',
  templateUrl: './wallet-withdrawal.component.html',
  styleUrls: ['./wallet-withdrawal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WalletWithdrawalComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '提现',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      color: ''
    }
  };
  // dialog
  @ViewChild('iosWithdrawal') iosWithdrawal: DialogComponent;
  public withdrawalConfig: DialogConfig = {};
  // dialogPay组件
  public dialogPayShow = false;
  public dialogPayConfig = new DialogPay('请输入支付密码', true, ['', '', '', '', '', ''], false, false, true);
  // balance
  public balance = 100.00;
  public balanceAmount: number;
  // withdrawalStatus
  public withdrawalStatus = false;
  public withdrawalBtn = true;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  public balanceChange() {
    this.withdrawalBtn = false;
    if (this.balanceAmount > this.balance) {
      this.withdrawalStatus = true;
      this.withdrawalBtn = true;
    } else {
      this.withdrawalStatus = false;
      this.withdrawalBtn = false;
    }
  }
  public onDialogPayClick(event): void {
    this.dialogPayShow = event.show;
    if (event.status) {
      return;
    }
    if (event.password === '123456') {
      this.router.navigate(['/mine/wallet/success/2']);
      return;
    }
    this.onShow('ios');
  }
  public onShow(type: SkinType) {
    this.withdrawalConfig = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: '重试',
      confirm: '忘记密码',
      btns: null,
      content: '支付密码错误，请重试'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Withdrawal`]).show().subscribe((res: any) => {
        if (!res.value) {
          this.dialogPayShow = true;
        } else {
          this.router.navigate(['/pay/resetpwd']);
        }
      });
    }, 10);
    return false;
  }
}
