import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, DialogComponent, DialogConfig, SkinType, ToastService} from 'ngx-weui';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {hex_sha1} from '../../common/tools/hex_sha1';
import {isNumber} from '../../common/tools/is_number';
import {random_word} from '../../common/tools/random_word';
import {is_ios} from '../../common/tools/is_ios';
import {
  blobToDataURL,
  noHeaderBase64DataToBlob,
} from '../../common/tools/readBlobAsDataURL';
declare const qrcode: any;
declare const wx: any;
@Component({
  selector: 'app-registered-referrer',
  templateUrl: './registered-referrer.component.html',
  styleUrls: ['./registered-referrer.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredReferrerComponent implements OnInit, OnDestroy {
  // ActionSheet
  @ViewChild('iosActionSheet') iosActionSheet: ActionSheetComponent;
  public actionSheetMenus: any[] = [
    { text: '扫描二维码', value: 'camera'},
    { text: '从手机相册选择', value: 'photo'},
  ];
  public configActionSheet: ActionSheetConfig = <ActionSheetConfig>{};
  // Dialog
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  // workId
  @ViewChild('workId') workId: ElementRef;
  // workId
  @ViewChild('referrerBtn') referrerBtn: ElementRef;
  public configDialog: DialogConfig = {};
  // data
  public referrerNumber: any = {
    workId: null,
    openid: null
  };
  public loading_show = false;

  constructor(
    private actionSheetService: ActionSheetService,
    private toastService: ToastService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private registeredService: RegisteredService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    if (this.globalSrv.wxSessionGetObject('openid')) {
      this.referrerNumber.openid = this.globalSrv.wxSessionGetObject('openid');
      this.referrerVerifyWxSdk();
    }
  }
  ngOnDestroy() {
    this.actionSheetService.destroyAll();
  }
  // camera
  public actionSheetShow(type: SkinType, element): void {
    this.configActionSheet.skin = type;
    this.configActionSheet = Object.assign({}, this.configActionSheet);
    setTimeout(() => {
      (<ActionSheetComponent>this[`${type}ActionSheet`]).show().subscribe((res: any) => {
        if (res.value === 'photo') {
          this.referrerImage();
          return;
        }
        if (res.value === 'camera') {
          this.referrerScan();
          return;
        }
      });
    }, 10);
  }
  // workId dialog
  public dialogShow(type: SkinType, msg: any) {
    this.configDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: null,
      confirm: '确定',
      content: msg
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Dialog`]).show().subscribe((res: any) => {
        // console.log('type', res);
      });
    }, 10);
    return false;
  }
  // upload img code
  public referrerUpImg(img_dada): void {
    const that = this;
    qrcode.decode(img_dada);
    qrcode.callback = function (imgMsg) {
      window.alert(imgMsg);
      that.workId.nativeElement.value = imgMsg;
      that.referrerBtn.nativeElement.disabled = false;
      that.referrerBtn.nativeElement.style.backgroundColor = '#1AAD19';
    };
  }
  // verify wxSDK
  public referrerVerifyWxSdk(): void {
    let url = '';
    if (is_ios()) {
     url = this.globalSrv.wxSessionGetObject('ios_url');
    } else {
      url = window.location.href;
    }
    if (this.globalSrv.wxSessionGetObject('ticket')) {
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
          'scanQRCode',
          'chooseImage'
        ]
      });
      return;
    }
    window.alert('调用摄像头失败，请重试');
  }
  // wx scan
  public referrerScan(): void {
    const that = this;
    wx.ready(function(res) {
      wx.scanQRCode({
        needResult: 1,
        scanType: ['qrCode', 'barCode'],
        success: function (videoRes) {
          that.referrerClick(videoRes.resultStr.workId);
        }
      });
    });
    wx.error(function(err) {
      alert(err.errMsg);
      // config信息验证失败会执行error函数，如签名过期导致验证失败，
      // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
      // 对于SPA可以在这里更新签名。
    });
  }
  // wx image
  public referrerImage(): void {
    const that = this;
    wx.ready(function(res) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: function (img_res) {
          const localIds = img_res.localIds;
          wx.getLocalImgData({
            localId: localIds[0], // 图片的localID
            success: function (img_down_res) {
              const a_blob = noHeaderBase64DataToBlob(img_down_res.localData);
              blobToDataURL(a_blob, (dataUrl_res) => {
                that.referrerUpImg(dataUrl_res);
              });
            }
          });
        }
      });
    });
  }
  // workId click
  public referrerClick(id?: any): void {
    if (id) {
      this.referrerNumber.workId = id;
    }
    if (!isNumber(this.referrerNumber.workId)) {
      window.alert('工号只能为数字');
      return;
    }
    this.loading_show = true;
    this.registeredService.verifyReferrer({workId: this.referrerNumber.workId}).subscribe(
      (val) => {
        this.loading_show = false;
        if (val.status === 200) {
          this.referrerNumber.workId = val.data.workId;
          this.router.navigate(['/registered/submit'], {queryParams: this.referrerNumber});
          return;
        }
        this.referrerNumber.workId = '';
        window.alert(val.message);
      }
    );
  }
}
