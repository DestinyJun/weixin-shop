import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MineSettingComponent} from './mine-setting.component';
import {MineSettingRoutingModule} from './mine-setting-routing.module';
import { SettingPaypwdComponent } from './setting-paypwd/setting-paypwd.component';
import { SettingMobileComponent } from './setting-mobile/setting-mobile.component';

@NgModule({
  declarations: [MineSettingComponent, SettingPaypwdComponent, SettingMobileComponent],
  imports: [
    CommonModule,
    MineSettingRoutingModule
  ]
})
export class MineSettingModule { }
