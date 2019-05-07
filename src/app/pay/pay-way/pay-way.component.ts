import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';
import {PayService} from '../../common/services/pay.service';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';
import {GlobalService} from '../../common/services/global.service';
import {EMPTY} from 'rxjs';
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
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.payOrdDetailInit(params);
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
    if (this.radioRes.radio === 'wallet') {
      console.log('wallet');
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
            this.router.navigate(['/pay/success'], {queryParams: {orderId: this.payDetailsData.id}});
          } else {
            console.log(val);
          }
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
          window.alert(JSON.stringify(val));
          console.log(val);
          if (val.status === 200) {
            this.onBridgeReady(val.dataObject);
            // this.router.navigate(['/pay/success'], {queryParams: {orderId: this.payDetailsData.id}});
          }
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
          this.router.navigate(['/pay/resetpwd']);
        }
      });
    }, 10);
    return false;
  }
  // weixin pay
  public onBridgeReady(obj) {
    const timeStamp = (new Date().getTime()) / 1000;
   /* const  payReq = {
      appId: obj.sub_appid, // 公众号名称，由商户传入
      timeStamp: timeStamp,  // 时间戳，自1970年以来的秒数
      nonceStr: obj.nonce_str, // 随机串
      package: `prepay_id=${obj.prepay_id}`,
      signType: `HMAC-SHA256`,
      paySign: obj.sign
    };*/
    console.log(obj);
   /* if (typeof WeixinJSBridge == 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }*/

    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', obj,
      function (res) {
        window.alert(JSON.stringify(res));
        console.log(res);
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          console.log(res);
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
