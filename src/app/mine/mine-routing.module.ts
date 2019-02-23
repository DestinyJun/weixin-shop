import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineUserComponent} from './mine-user/mine-user.component';
import {MineSharedComponent} from './mine-shared/mine-shared.component';
const tabRoutes: Routes = [
  {path: 'order', loadChildren: './mine-order/mine-order.module#MineOrderModule'},
  {path: 'setting', loadChildren: './mine-setting/mine-setting.module#MineSettingModule'},
  {path: 'shared', component: MineSharedComponent},
  {path: 'team', loadChildren: './mine-team/mine-team.module#MineTeamModule'},
  {path: 'profile', component: MineUserComponent},
  {path: 'wallet', loadChildren: './mine-wallet/mine-wallet.module#MineWalletModule'},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineRoutingModule {}
