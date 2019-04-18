import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogPay} from '../../common/components/dialog-pay/dialog-pay.component';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';
import {Router} from '@angular/router';
import {MineService} from '../../common/services/mine.service';

@Component({
  selector: 'app-mine-setting',
  templateUrl: './mine-setting.component.html',
  styleUrls: ['./mine-setting.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineSettingComponent implements OnInit {
  // dialogPay组件
  public dialogPayShow = false;
  public dialogPayConfig = new DialogPay('修改支付密码', true, ['', '', '', '', '', ''], false, false, true);
  // dialog
  @ViewChild('iosSetting') iosSetting: DialogComponent;
  public settingConfig: DialogConfig = {};
  // header
  public headerOption: HeaderContent = {
    title: '设置',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      color: '#86B876'
    }
  };
  constructor(
    private router: Router,
    private mineSrv: MineService
  ) { }

  ngOnInit() {
  }
  public onDialogPayClick(event): void {
    this.dialogPayShow = event.show;
    if (event.status) {
      return;
    }
    this.mineSrv.mineVerifyPayPwd({payPwd: event.password}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.router.navigate(['/mine/setting/paypwd']);
        } else {
          this.onShow('ios', val.message);
        }
      }
    );
  }
  public onShow(type: SkinType, msg) {
    this.settingConfig = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: '重试',
      confirm: '忘记密码',
      btns: null,
      content: '支付密码错误，请重试'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Setting`]).show().subscribe((res: any) => {
        if (!res.value) {
          this.dialogPayShow = true;
        } else {
          this.router.navigate(['/pay/resetpwd']);
        }
      });
    }, 10);
    return false;
  }
}
