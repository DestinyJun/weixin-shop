import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, SkinType} from 'ngx-weui';

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
  menus: any[] = [
    { text: '扫描二维码', value: 'test', other: 1 },
    { text: '从手机相册选择', value: 'test' },
  ];
  config: ActionSheetConfig = <ActionSheetConfig>{};


  constructor(private srv: ActionSheetService) { }

  ngOnInit() {
  }
  onShow(type: SkinType) {
    this.config.skin = type;
    this.config = Object.assign({}, this.config);
    setTimeout(() => {
      (<ActionSheetComponent>this[`${type}AS`]).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
  }

  onShowBySrv(type: SkinType, backdrop: boolean = true) {
    this.config.skin = type;
    this.config.backdrop = backdrop;
    this.srv.show(this.menus, this.config).subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.srv.destroyAll();
  }

}
