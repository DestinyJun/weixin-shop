import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {
  ActionSheetComponent,
  ActionSheetConfig,
  DialogComponent,
  DialogConfig, PickerService,
  SkinType, ToastComponent,
} from 'ngx-weui';
import {MineService} from '../../common/services/mine.service';
import {is_ios} from '../../common/tools/is_ios';
import {random_word} from '../../common/tools/random_word';
import {hex_sha1} from '../../common/tools/hex_sha1';
import {GlobalService} from '../../common/services/global.service';
import {blobToDataURL, dataURLtoFile, headerBase64DataToBlob, noHeaderBase64DataToBlob} from '../../common/tools/readBlobAsDataURL';
import {DATA} from '../../common/data/city_data';
declare const wx: any;
@Component({
  selector: 'app-mine-user',
  templateUrl: './mine-user.component.html',
  styleUrls: ['./mine-user.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineUserComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '个人资料',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  // picker
  res: any = {
    city: '520102',
    date: new Date()
  };
  public cityData = DATA;
  // ActionSheet
  @ViewChild('iosActionSheet') iosActionSheet: ActionSheetComponent;
  public actionSheetMenus: any[] = [
    {text: '拍照', value: 'camera'},
    {text: '从手机相册选择', value: 'photo'},
  ];
  public configActionSheet: ActionSheetConfig = <ActionSheetConfig>{};
  // dialog
  @ViewChild('ios') iosAS: DialogComponent;
  // toast
  @ViewChild('success') successToast: ToastComponent;
  config: DialogConfig = {};
  // data
  public tabMineUserInfo: any = null;
  public updateSexMsg = '修改成功';
  constructor(
    private mineSrv: MineService,
    private globalSrv: GlobalService,
    private pickerSrv: PickerService
  ) {
  }

  ngOnInit() {
    this.tabMineDateInit();
    this.mineUserWxSdk();
  }
  public tabMineDateInit (): void {
    this.mineSrv.mineGetUserInfo().subscribe(
      (val) => {
        if (val.status === 200) {
          this.tabMineUserInfo = val.data;
        }
      }
    );
  }
  public actionSheetShow(type: SkinType, element): void {
    this.configActionSheet.skin = type;
    this.configActionSheet = Object.assign({}, this.configActionSheet);
    setTimeout(() => {
      (<ActionSheetComponent>this[`${type}ActionSheet`]).show().subscribe((res: any) => {
        if (res.value === 'photo') {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: ['album'],
            success: function (img_res) {
              window.alert(JSON.stringify(img_res));
              const localIds = img_res.localIds;
              wx.getLocalImgData({
                localId: localIds[0], // 图片的localID
                success: function (img_base64_res) {
                  const fileData = new FormData();
                  window.alert(img_base64_res.localData);
                  const a_blob = noHeaderBase64DataToBlob(img_base64_res.localData);
                  window.alert(JSON.stringify(a_blob));
                  blobToDataURL(a_blob, (blob_res) => {
                    window.alert(JSON.stringify(dataURLtoFile(blob_res, 'test')));
                    fileData.append('file', dataURLtoFile(blob_res, 'test'));
                  });
                }
              });
              wx.uploadImage({
                localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (upload_res) {
                  window.alert(upload_res);
                  window.alert(JSON.stringify(upload_res));
                  console.log(upload_res);
                }
              });
            }
          });
          return;
        }
        if (res.value === 'camera') {
          // 调用手机相机
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: function (img_res) {
              window.alert(JSON.stringify(img_res));
              const localIds = img_res.localIds;
              wx.uploadImage({
                localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (upload_res) {
                  window.alert(JSON.stringify(upload_res));
                  window.alert(JSON.stringify(headerBase64DataToBlob(upload_res.localData)));
                  console.log(upload_res);
                }
              });
            }
          });
        }
      });
    }, 10);
  }
  public onShow(type: SkinType) {
    this.config = Object.assign({}, <DialogConfig>{
      skin: type,
      type: 'prompt',
      title: '请选择性别',
      cancel: null,
      confirm: '确定',
      btns: null,
      input: 'radio',
      content: null,
      inputOptions: [
        {text: '男', value: '1'},
        {text: '女', value: '0'},
      ]
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}AS`]).show().subscribe((res: any) => {
        console.log('type', res);
        this.mineSrv.mineUpdateUserName({sex: res.result.value}).subscribe(
          (val) => {
            console.log(val);
            if (val.status === 200) {
              this.updateSexMsg = '修改成功';
              this.tabMineDateInit();
              this.onToastShow('success');
              return;
            }
            this.updateSexMsg = `修改失败，错误代码：${val.status}`;
            this.onToastShow('success');
          }
        );
      });
    }, 10);
    return false;
  }
  // address click
  public mineUserAddressClick(): void {
    this.pickerSrv.showCity(this.cityData).subscribe((res: any) => {
      this.mineSrv.mineUpdateUserName({address: res.items[0].name + res.items[1].name + res.items[2].name}).subscribe(
        (val) => {
          console.log(val);
          if (val.status === 200) {
            this.updateSexMsg = '修改成功';
            this.tabMineDateInit();
            this.onToastShow('success');
            return;
          }
          this.updateSexMsg = `修改失败，错误代码：${val.status}`;
          this.onToastShow('success');
        }
      );
    });
  }
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  // verify wxSDK
  public mineUserWxSdk(): void {
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
          'chooseImage',
          'openLocation',
          'getLocation',
        ]
      });
      return;
    }
    // window.alert('微信SDK认证失败');
  }
}
