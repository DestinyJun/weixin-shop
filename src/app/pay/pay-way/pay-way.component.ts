import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {Router} from '@angular/router';

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
  public dialogPayConfig = new DialogPay(true, ['', '', '', '', '', ''], false, false, true);
  // timer
  public setTimer: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}
  public radioResChanges (): void {
      console.log(this.radioRes);
  }
  public onDialogPayClick(event): void {
    this.dialogPayShow = event.show;
    if (event.password === 'destroy') {
      return;
    }
    if (event.password === '123456') {
      this.router.navigate(['/pay/success']);
    }
  }
}
