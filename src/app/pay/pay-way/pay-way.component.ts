import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';
import {PayService} from '../../common/services/pay.service';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';

@Component({
  selector: 'app-pay-way',
  templateUrl: './pay-way.component.html',
  styleUrls: ['./pay-way.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class PayWayComponent implements OnInit, OnDestroy {
  // timer
  public timer: any = null;
  public cleanTimer: any;
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
  // order detail
  public payDetailsData: any = null;
  // dialogPay
  public dialogPayShow = false;
  public dialogPayConfig = new DialogPay('请输入支付密码', true, ['', '', '', '', '', ''], false, false, true);
  // dialog
  @ViewChild('iosPayWay') iosPayWay: DialogComponent;
  public iosPayWayConfig: DialogConfig = {};

  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private paySrv: PayService,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((params: Params) => {
      window.alert(JSON.stringify(params));
      this.payOrdDetailInit(params);
    });
  }
  // data init
  public payOrdDetailInit (params): void {
     this.paySrv.payOrdGetDetail(params).subscribe((val) => {
       if (val.status === 200) {
         if (val.data) {
           this.payDetailsData = val.data;
           this.cleanTimer = setInterval(() => {
             this.timer = this.timerInit(val.data.createdDate);
           }, 1000);
         }
       }
    });
  }
  // time init
  public timerInit (startTime): any {
    const startDate = new Date(startTime); // 开始时间
    const endDate = new Date(); // 结束时间
    const totalDate = 900000; // 结束时间
    const t = totalDate - (endDate.getTime() - startDate.getTime()); // 时间差
    let d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
      // return [d, h, m, s];
      if (d) {
        return '剩' + d + '天' + h + '小时' + m + '分钟' + s + '秒' + '自动关闭';
      }
      if (h) {
        return '剩' + h + '小时' + m + '分钟' + s + '秒' + '自动关闭';
      }
      if (m) {
        return '剩' + m + '分钟' + s + '秒' + '自动关闭';
      }
      if (s) {
        return '剩' + s + '秒' + '自动关闭';
      }
    } else {
      return '付款超时，请重新购买';
    }
  }
  // pay way
  public radioResChanges (): void {
      console.log(this.radioRes);
  }
  // verify pay
  public onDialogPayClick(event): void {
    this.dialogPayShow = event.show;
    if (event.status) {
      return;
    }
    this.paySrv.payPwdVerify({payPwd: event.password})
      .pipe(mergeMap((key) => {
        return this.paySrv.payWalletVerify({payPwd: key.backString, orderId: this.payDetailsData.id});
      }))
      .subscribe((val) => {
        if (val.status === 200) {
          this.router.navigate(['/pay/success'], {queryParams: {orderId: this.payDetailsData.id}});
        }
    });
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
  // clearInterval
  ngOnDestroy(): void {
    clearInterval(this.cleanTimer);
  }
}
