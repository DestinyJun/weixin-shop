import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {
  ActionSheetComponent,
  ActionSheetConfig,
  DialogComponent,
  DialogConfig,
  DialogService,
  InputType,
  SkinType,
  ToastService
} from 'ngx-weui';

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
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      icon: ''
    }
  };
  // ActionSheet
  @ViewChild('iosActionSheet') iosActionSheet: ActionSheetComponent;
  public actionSheetMenus: any[] = [
    { text: '扫描二维码', value: 'camera'},
    { text: '从手机相册选择', value: 'photo'},
  ];
  public configActionSheet: ActionSheetConfig = <ActionSheetConfig>{};
  // dialog
  @ViewChild('ios') iosAS: DialogComponent;
  config: DialogConfig = {};
  constructor() { }

  ngOnInit() {
  }
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
          // 调用手机相机
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
        { text: '男', value: 'man' },
        { text: '女', value: 'woman' },
      ]
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}AS`]).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
    return false;
  }
}
