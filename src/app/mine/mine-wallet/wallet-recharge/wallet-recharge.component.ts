import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {Router} from '@angular/router';
import {DialogComponent, DialogConfig, MaskComponent, SkinType} from 'ngx-weui';
import {MineWalletService} from '../../../common/services/mine-wallet.service';
import {DialogPay} from '../../../common/components/dialog-pay/dialog-pay.component';
import {mergeMap} from 'rxjs/operators';
import {GlobalService} from '../../../common/services/global.service';
declare let WeixinJSBridge;
@Component({
  selector: 'app-wallet-recharge',
  templateUrl: './wallet-recharge.component.html',
  styleUrls: ['./wallet-recharge.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WalletRechargeComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '余额充值',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      color: ''
    }
  };
  // dialogPay
  public mineWalletPayShow = false;
  public mineWalletPayConfig = new DialogPay('请输入支付密码', true, ['', '', '', '', '', ''], false, false, true);
  // mask
  @ViewChild('rechargeMask') rechargeMask: MaskComponent;
  // dialog
  public iosPayWayConfig: DialogConfig = {};
  // data
  public rechargeAmount: number;
  public rechargeOrderId: any;
  public rechargeOrderSn: any;
  constructor(
    private router: Router,
    private mineWalletSrv: MineWalletService,
    private globalSrv: GlobalService
  ) { }

  ngOnInit() {}
  public rechargeClick() {
    this.mineWalletSrv.mineWalletRecharge({money: this.rechargeAmount}).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          this.rechargeOrderId = val.data.id;
          this.rechargeOrderSn = val.data.sn;
          this.rechargeMask.show();
        }
      }
    );
  }
  public rechargePayClick() {
    this.router.navigate(['/mine/wallet/success'], {
      queryParams: {
        amount: this.rechargeAmount,
        status: 1
    }});
    this.rechargeMask.hide();
    this.mineWalletPayShow = true;
    // this.router.navigate(['/mine/wallet/success/1']);
  }
  // verify pay
  public onDialogPayClick(event): void {
    this.mineWalletPayShow = event.show;
    if (event.status) {
      return;
    }
    this.mineWalletSrv.mineWalletVerifyPwd({payPwd: event.password})
      .pipe(mergeMap((key) => {
        console.log(key);
        if (key.status === 200) {
          return this.mineWalletSrv.mineWalletWxVerify({
            payPwd: key.backString,
            orderId: this.rechargeOrderId,
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
        }
      });
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
          this.mineWalletPayShow = true;
        } else {
          this.router.navigate(['/pay/resetpwd']);
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
        window.alert(JSON.stringify(res));
        console.log(res);
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          that.router.navigate(['/pay/success'], {queryParams: {amount: that.rechargeAmount}});
          console.log(res);
        }
      });
  }
}
