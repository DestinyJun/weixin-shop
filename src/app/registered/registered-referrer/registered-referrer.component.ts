import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActionSheetComponent, ActionSheetConfig, ActionSheetService, SkinType} from 'ngx-weui';
import {Router} from '@angular/router';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-registered-referrer',
  templateUrl: './registered-referrer.component.html',
  styleUrls: ['./registered-referrer.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredReferrerComponent implements OnInit, OnDestroy {
  @ViewChild('ios') iosAS: ActionSheetComponent;
  public alertMenus: any[] = [
    { text: '扫描二维码', value: 'camera'},
    { text: '从手机相册选择', value: 'photo'},
  ];
  public config: ActionSheetConfig = <ActionSheetConfig>{};


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
    private srv: ActionSheetService,
    private router: Router
  ) { }

  ngOnInit() {}
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  public actionSheetShow(type: SkinType, element): void {
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
  public referrerClick(): void {
      if (this.referrerNumber) {
        this.router.navigate(['/registered/submit', {referrerNumber: this.referrerNumber}]);
      }
  }

}
