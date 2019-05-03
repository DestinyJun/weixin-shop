import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, DialogComponent, DialogConfig, SkinType, ToastService} from 'ngx-weui';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';
import {GlobalService} from '../../common/services/global.service';
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
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
        this.referrerNumber.openid =  params.openid;
      }
    );
    this.registeredService.regGetWxticket({
      access_token: '21_cwnGUfgjYTfsMGiiVVkjU8YXNieGnSM655XeDUAjly8xuKemMGfvYbfzTW_ZWex7Wh41OOzEXDuu_9Ez7mh_6g'})
      .subscribe(
      (val) => {
        console.log(val);
      }
    );
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxbacad0ba65a80a3d', // 必填，公众号的唯一标识
      timestamp: '', // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '', // 必填，签名
      jsApiList: [] // 必填，需要使用的JS接口列表
    });
    wx.ready(function(res) {
      // console.log(res);
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    wx.error(function(err) {
      // console.log(err);
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
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
          element.click();
          return;
        }
        if (res.value === 'camera') {
          // this.router.navigate(['/registered/camera']);
          return;
        }
      });
    }, 10);
  }
  // workId dialog
  public dialogShow(type: SkinType) {
    this.configDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: null,
      confirm: '确定',
      content: '推荐码不存在'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Dialog`]).show().subscribe((res: any) => {
        // console.log('type', res);
      });
    }, 10);
    return false;
  }
  // workId click
  public referrerClick(): void {
    this.globalSrv.remindEvent.next(true);
    this.registeredService.verifyReferrer(this.referrerNumber).subscribe(
      (val) => {
        this.globalSrv.remindEvent.next(false);
        if (val.status === 200) {
          this.referrerNumber.workId = val.data.workId;
          this.router.navigate(['/registered/submit'], {queryParams: this.referrerNumber});
          return;
        }
        this.referrerNumber.workId = '';
        this.dialogShow('ios');
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
}
