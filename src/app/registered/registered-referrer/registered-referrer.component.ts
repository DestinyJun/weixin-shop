import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, SkinType} from 'ngx-weui';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registered-referrer',
  templateUrl: './registered-referrer.component.html',
  styleUrls: ['./registered-referrer.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredReferrerComponent implements OnInit, OnDestroy {
  @ViewChild('ios') iosAS: ActionSheetComponent;
  @ViewChild('android') androidAS: ActionSheetComponent;
  @ViewChild('auto') autoAS: ActionSheetComponent;
  public alertMenus: any[] = [
    { text: '扫描二维码', value: 'camera'},
    { text: '从手机相册选择', value: 'photo'},
  ];
  public config: ActionSheetConfig = <ActionSheetConfig>{};


  constructor(
    private srv: ActionSheetService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  public onShow(type: SkinType, element): void {
    this.config.skin = type;
    this.config = Object.assign({}, this.config);
    setTimeout(() => {
      (<ActionSheetComponent>this[`${type}AS`]).show().subscribe((res: any) => {
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

 public onShowBySrv(type: SkinType, backdrop: boolean = true): void {
    this.config.skin = type;
    this.config.backdrop = backdrop;
    this.srv.show(this.alertMenus, this.config).subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.srv.destroyAll();
  }

}
