import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {MineService} from '../../common/services/mine.service';
import {is_ios} from '../../common/tools/is_ios';
import {random_word} from '../../common/tools/random_word';
import {hex_sha1} from '../../common/tools/hex_sha1';
import {GlobalService} from '../../common/services/global.service';

declare const wx: any;

@Component({
  selector: 'app-mine-shared',
  templateUrl: './mine-shared.component.html',
  styleUrls: ['./mine-shared.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineSharedComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '邀请你加入团队',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '换个样式',
      color: '#75B1F3'
    }
  };
  public qrImgRrl: string = null;

  constructor(
    private mineSrv: MineService,
    private globalSrv: GlobalService,
  ) {
  }

  ngOnInit() {
    this.mineSharedWxSdk();
    this.mineSharedInitialize();
  }

  public mineSharedInitialize(): void {
    this.mineSrv.mineGetQrImg({}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.qrImgRrl = val.data.QRimage;
          console.log(this.qrImgRrl);
        }
        console.log(val);
      }
    );
  }

  public sharegHeaderRightClick() {
    this.mineSharedInitialize();
  }

  // verify wxSDK
  public mineSharedWxSdk(): void {
    let url = '';
    if (is_ios()) {
      url = this.globalSrv.wxSessionGetObject('ios_url');
    } else {
      url = window.location.href;
    }
    if (this.globalSrv.wxSessionGetObject('ticket')) {
      const that = this;
      const jsapi_ticket = this.globalSrv.wxSessionGetObject('ticket');
      const noncestr = random_word(32);
      const timestamp = (Math.round(new Date().getTime() / 1000)).toString();
      const sdkstring = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
      const signature = hex_sha1(sdkstring);
      wx.config({
        debug: true,
        appId: 'wxbacad0ba65a80a3d',
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
        ]
      });
      wx.ready(function () {   // 需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: '测试1111', // 分享标题
          desc: '测试1111', // 分享描述
          link: that.qrImgRrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: that.qrImgRrl, // 分享图标
          success: function () {
            // 设置成功
          }
        });
        wx.updateTimelineShareData({
          title: '测试1111', // 分享标题
          link: that.qrImgRrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: that.qrImgRrl, // 分享图标
          success: function () {
            // 设置成功
          }
        });
      });
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
      return;
    }
    // window.alert('微信SDK认证失败');
  }
}
