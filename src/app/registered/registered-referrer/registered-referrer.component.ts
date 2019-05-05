import {Component, OnChanges, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, DialogComponent, DialogConfig, SkinType, ToastService} from 'ngx-weui';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
import {mergeMap} from 'rxjs/operators';
import {hex_sha1} from '../../common/tools/hex_sha1';
import {isNumber} from '../../common/tools/is_number';
import {random_word} from '../../common/tools/random_word';
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
  public configDialog: DialogConfig = {};
  // data
  public referrerNumber: any = {
    workId: null,
    openid: null
  };

  constructor(
    private actionSheetService: ActionSheetService,
    private toastService: ToastService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private registeredService: RegisteredService,
    private globalSrv: GlobalService
  ) { }

  ngOnInit() {
    this.referrerNumber.openid = this.globalSrv.wxSessionGetObject('openid');
    // wx sdk
    if (!this.globalSrv.wxSessionGetObject('ticket')) {
      this.referrerWxTicket();
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
          // element.click();
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
  // workId click
  public referrerClick(id?: any): void {
    if (id) {
      this.referrerNumber.workId = id;
    }
    if (!isNumber(this.referrerNumber.workId)) {
      window.alert('工号只能为数字');
      return;
    }
    this.globalSrv.remindEvent.next(true);
    this.registeredService.verifyReferrer({workId: this.referrerNumber.workId}).subscribe(
      (val) => {
        this.globalSrv.remindEvent.next(false);
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
  // upload img code
  public referrerUpImg(event): void {
    const that = this;
    const uploadFileURL = window.URL.createObjectURL(event.target.files[0]);
    qrcode.decode(uploadFileURL);
    qrcode.callback = function (imgMsg) {
      that.referrerNumber.workId = imgMsg;
    };
  }
  // get wx ticket
  public referrerWxTicket(): void {
    this.registeredService.regGetWxToken().pipe(
      mergeMap((val) => {
        if (val) {
          this.globalSrv.wxSessionSetObject('js_access_token', val.access_token);
          return  this.registeredService.regGetWxticket({ access_token: val.access_token});
        }
      })
    ) .subscribe(
      (val) => {
        this.globalSrv.wxSessionSetObject('ticket', val.ticket);
        this.referrerVerifyWxSdk();
      }
    );
  }
  // verify wxSDK
  public referrerVerifyWxSdk(): void {
    if (this.globalSrv.wxSessionGetObject('ticket')) {
      const jsapi_ticket = this.globalSrv.wxSessionGetObject('ticket');
      const noncestr = random_word(32);
      const timestamp = (Math.round(new Date().getTime() / 1000)).toString();
      const url = 'http://1785s28l17.iask.in/moyaoView/registered';
      const sdkstring = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
      const signature = hex_sha1(sdkstring);
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxbacad0ba65a80a3d', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: [
          'scanQRCode',
          'chooseImage'
        ] // 必填，需要使用的JS接口列表
      });
    } else {
      window.alert('调用摄像头失败，请重试');
    }
  }
  // wx scan
  public referrerScan(): void {
    const that = this;
    wx.ready(function(res) {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
      // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
      // 则须把相关接口放在ready函数中调用来确保正确执行。
      // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (videoRes) {
          // 当needResult 为 1 时，扫码返回的结果
          that.referrerClick(videoRes.resultStr);
        }
      });
    });
    wx.error(function(err) {
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
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (img_res) {
          window.alert(JSON.stringify(img_res.localIds));
          const localIds = img_res.localIds;
          wx.getLocalImgData({
            localId: localIds, // 图片的localID
            success: function (img_down_res) {
              window.alert(img_down_res.localData); // localData是图片的base64数据，可以用img标签显示
            }
          });
        }
      });
    });
  }
}
