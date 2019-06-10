import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';
import {PayService} from '../../common/services/pay.service';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';
import {GlobalService} from '../../common/services/global.service';
import {EMPTY} from 'rxjs';
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
  // dialogPay
  public dialogPayShow = false;
  public dialogPayConfig = new DialogPay('请输入支付密码', true, ['', '', '', '', '', ''], false, false, true);
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
       console.log(val);
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
    // window.alert(`${startDates},${endDates},${totalDate},${t}`);
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
    if (this.radioRes.radio === 'wallet') {
      this.paySrv.payPwdVerify({payPwd: event.password})
        .pipe(mergeMap((key) => {
          if (key.status === 200) {
            return this.paySrv.payWalletVerify({payPwd: key.backString, orderId: this.payDetailsData.id});
          } else {
            this.onShow('ios', key.message);
            return EMPTY;
          }
        }))
        .subscribe((val) => {
          console.log(val);
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
              msg: `${val.message},错误码：${val.status}`,
              url: '/mine/wallet/recharge',
              btn: '点击充值'
            }});
        });
      return;
    }
    if (this.radioRes.radio === 'weixin') {
      this.paySrv.payPwdVerify({payPwd: event.password})
        .pipe(mergeMap((key) => {
          console.log(key);
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
          console.log(val);
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
  }
// clearInterval
  ngOnDestroy(): void {
    clearInterval(this.cleanTimer);
  }
}
