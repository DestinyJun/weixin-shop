import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {Router} from '@angular/router';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';

@Component({
  selector: 'app-pay-way',
  templateUrl: './pay-way.component.html',
  styleUrls: ['./pay-way.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class PayWayComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '选择支付方式',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      icon: ''
    }
  };
  // radio
  public radioRes: any = {
    radio: 'wallet',
  };
  // dialogPay组件
  public dialogPayShow = false;
  public dialogPayConfig = new DialogPay('请输入支付密码', true, ['', '', '', '', '', ''], false, false, true);
  // dialog
  @ViewChild('iosPayWay') iosPayWay: DialogComponent;
  public iosPayWayConfig: DialogConfig = {};
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}
  public radioResChanges (): void {
      console.log(this.radioRes);
  }
  public onDialogPayClick(event): void {
    this.dialogPayShow = event.show;
    if (event.status) {
      return;
    }
    if (event.password === '123456') {
      this.router.navigate(['/pay/success']);
      return;
    }
    this.onShow('ios');
  }
  public onShow(type: SkinType) {
    this.iosPayWayConfig = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: '重试',
      confirm: '忘记密码',
      btns: null,
      content: '支付密码错误，请重试'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}PayWay`]).show().subscribe((res: any) => {
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
