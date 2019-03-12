import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, DialogComponent, DialogConfig, SkinType, ToastService} from 'ngx-weui';
import {Router} from '@angular/router';
import {RegisteredService} from '../../common/services/registered.service';

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
    workId: ''
  };

  constructor(
    private actionSheetService: ActionSheetService,
    private toastService: ToastService,
    private router: Router,
    private registeredService: RegisteredService
  ) { }

  ngOnInit() {}
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
      skin: type,
      cancel: null,
      confirm: '确定',
      content: '推荐码不存在'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Dialog`]).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
    return false;
  }
  public referrerClick(): void {
    this.registeredService.verifyReferrer(this.referrerNumber).subscribe(
      (val) => {
        if (val.status === 200) {
          this.router.navigate(['/registered/submit', {referrerNumber: this.referrerNumber}]);
          return;
        }
        this.dialogShow('ios');
        this.referrerNumber.workId = '';
      }
    );
  }
  ngOnDestroy() {
    this.actionSheetService.destroyAll();
  }
}
