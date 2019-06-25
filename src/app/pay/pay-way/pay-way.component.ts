import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';
import {PayService} from '../../common/services/pay.service';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';
import {GlobalService} from '../../common/services/global.service';
import {EMPTY, timer} from 'rxjs';
import {is_ios} from '../../common/tools/is_ios';
declare let WeixinJSBridge;

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
      icon: 'icon iconfont icon-fanhui'
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
  // pay mask
  public inputPws: any;
  public inputPwsTimer: any;
  public dialogPayShow = false;
  public config = {
    title: '请输入支付密码',
    value: ['', '', '', '', '', '']
  };
  @ViewChild('passwordInput') passwordInput: ElementRef;
  // dialog
  @ViewChild('iosPayWay') iosPayWay: DialogComponent;
  public iosPayWayConfig: DialogConfig = {};
  // data
  public orderId: any = null;

  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private paySrv: PayService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((params: Params) => {
      this.payOrdDetailInit(params);
      this.orderId = params;
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
       } else {
         this.router.navigate(['/error'], {
           queryParams: {
             msg: `获取数据失败，请检查网络后重试！`,
             url: null,
             btn: '请重试',
           }});
       }
    });
  }
  // time init
  public timerInit (startTime): any {
    let startDates;
    if (is_ios()) {
      startDates = new Date(startTime.replace(/-/g, '/')).getTime(); // 开始时间
    } else {
      startDates = new Date(startTime).getTime(); // 开始时间
    }
    const endDates = new Date().getTime(); // 结束时间
    const totalDate = 900000; // 结束时间
    const t = totalDate - (endDates - startDates); // 时间差
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
  // verify pay
  public onDialogPayClick(password): void {
    this.dialogPayShow = false;
    if (this.radioRes.radio === 'wallet') {
      this.paySrv.payPwdVerify({payPwd: password})
        .pipe(mergeMap((key) => {
          if (key.status === 200) {
            return this.paySrv.payWalletVerify({payPwd: key.backString, orderId: this.payDetailsData.id});
          } else {
            this.onShow('ios', key.message);
            return EMPTY;
          }
        }))
        .subscribe((val) => {
          if (val.status === 200) {
            this.router.navigate(['/pay/success'], {
              queryParams: {
                sn: this.payDetailsData.sn,
                orderId: this.payDetailsData.id
              }});
            return;
          }
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `${val.message}错误码：${val.status}`,
              url: '/mine/wallet/recharge',
              btn: '点击充值'
            }});
        });
      return;
    }
    if (this.radioRes.radio === 'weixin') {
      this.paySrv.payPwdVerify({payPwd: password})
        .pipe(mergeMap((key) => {
          if (key.status === 200) {
            return this.paySrv.payWeixinVerify({
              payPwd: key.backString,
              orderId: this.payDetailsData.id,
              openid: this.globalSrv.wxSessionGetObject('openid')
            });
          } else {
            this.onShow('ios', key.message);
          }
        }))
        .subscribe((val) => {
          if (val.status === 200) {
            this.onBridgeReady(val.dataObject);
            return;
          }
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `${val.message},错误码：${val.status}`,
              url: null,
              btn: '请重试'
            }});
        });
      return;
    }
  }
  public onShow(type: SkinType, msg: string) {
    this.iosPayWayConfig = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: '重试',
      confirm: '忘记密码',
      btns: null,
      content: msg
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}PayWay`]).show().subscribe((res: any) => {
        if (!res.value) {
          this.dialogPayShow = true;
        } else {
          this.router.navigate(['/mine/setting/paypwd']);
        }
      });
    }, 10);
    return false;
  }
  // weixin pay
  public onBridgeReady(obj) {
    const that = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', obj,
      function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          that.paySrv.payWeixinConfirm(that.orderId).subscribe(
            (val) => {
              that.router.navigate(['/pay/success'], {
                queryParams: {
                  sn: that.payDetailsData.sn,
                  orderId: that.payDetailsData.id
                }});
            }
          );
        }
      });
  }
  // pay sure
  public paySureClick() {
    this.dialogPayShow = true;
    timer(200).subscribe(
      () => {
        this.passwordInput.nativeElement.focus();
      }
    );
  }
  // clearInterval
  ngOnDestroy(): void {
    clearInterval(this.cleanTimer);
    clearInterval(this.inputPwsTimer);
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
      this.onDialogPayClick(this.inputPws);
      this.inputPwsTimer = setTimeout(() => {
        this.inputPws = null;
      }, 50);
    }
  }
}
