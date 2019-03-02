import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MineSettingComponent} from './mine-setting.component';
import {MineSettingRoutingModule} from './mine-setting-routing.module';
import { SettingPaypwdComponent } from './setting-paypwd/setting-paypwd.component';
import { SettingMobileComponent } from './setting-mobile/setting-mobile.component';
import {HeaderModule} from '../../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {DialogPayModule} from '../../common/components/dialog-pay/dialog-pay.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MineSettingComponent, SettingPaypwdComponent, SettingMobileComponent],
  imports: [
    CommonModule,
    MineSettingRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    DialogPayModule,
    FormsModule
  ]
})
export class MineSettingModule { }
