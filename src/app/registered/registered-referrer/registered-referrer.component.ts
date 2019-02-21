import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, DialogComponent, DialogConfig, SkinType, ToastService} from 'ngx-weui';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-registered-referrer',
  templateUrl: './registered-referrer.component.html',
  styleUrls: ['./registered-referrer.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredReferrerComponent implements OnInit, OnDestroy {
  // ActionSheet组件
  @ViewChild('iosActionSheet') iosActionSheet: ActionSheetComponent;
  public actionSheetMenus: any[] = [
    { text: '扫描二维码', value: 'camera'},
    { text: '从手机相册选择', value: 'photo'},
  ];
  public configActionSheet: ActionSheetConfig = <ActionSheetConfig>{};
  // Dialog组件
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  public configDialog: DialogConfig = {};

  // 基础数据
  public referrerNumber: number;
  public headerOption: HeaderContent = {
    title: '填写推荐人',
    leftContent: {
      icon: 'fa fa-times'
    },
    rightContent: {
      icon: 'fa fa-ellipsis-h'
    }
  };

  constructor(
    private actionSheetService: ActionSheetService,
    private toastService: ToastService,
    private router: Router,
    public titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('请填写推荐人');
  }
  ngOnDestroy() {
    this.actionSheetService.destroyAll();
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
          this.router.navigate(['/registered/camera']);
          return;
        }
      });
    }, 10);
  }
  public dialogShow(type: SkinType) {
    this.configDialog = Object.assign({}, <DialogConfig>{
      cancel: null,
      confirm: '确定',
      content: '请填写推荐人工号'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Dialog`]).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
    return false;
  }
  public referrerClick(): void {
      if (this.referrerNumber) {
        this.router.navigate(['/registered/submit', {referrerNumber: this.referrerNumber}]);
        return;
      }
    this.dialogShow('ios');
  }
}
