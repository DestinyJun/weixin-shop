import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineUserComponent} from './mine-user/mine-user.component';
import {MineSharedComponent} from './mine-shared/mine-shared.component';
import {MineTeamComponent} from './mine-team/mine-team.component';
import {MineSettingComponent} from './mine-setting/mine-setting.component';
import {MineWalletComponent} from './mine-wallet/mine-wallet.component';
const tabRoutes: Routes = [
  {path: 'wallet', component: MineWalletComponent},
  {path: 'shared', component: MineSharedComponent},
  {path: 'team', component: MineTeamComponent},
  {path: 'setting', component: MineSettingComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineRoutingModule {}
