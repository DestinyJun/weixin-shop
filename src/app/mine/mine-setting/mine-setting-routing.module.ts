import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineSettingComponent} from './mine-setting.component';
import {SettingMobileComponent} from './setting-mobile/setting-mobile.component';
import {SettingPaypwdComponent} from './setting-paypwd/setting-paypwd.component';
const tabRoutes: Routes = [
  {path: '', component: MineSettingComponent},
  {path: 'mobile', component: SettingMobileComponent},
  {path: 'paypwd', component: SettingPaypwdComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineSettingRoutingModule {}
