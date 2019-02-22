import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineUserComponent } from './mine-user/mine-user.component';
import { MineWalletComponent } from './mine-wallet/mine-wallet.component';
import { MineSharedComponent } from './mine-shared/mine-shared.component';
import { MineTeamComponent } from './mine-team/mine-team.component';
import { MineSettingComponent } from './mine-setting/mine-setting.component';
import {MineRoutingModule} from './mine-routing.module';
import {HeaderModule} from '../common/components/header/header.module';

@NgModule({
  declarations: [MineUserComponent, MineWalletComponent, MineSharedComponent, MineTeamComponent, MineSettingComponent],
  imports: [
    CommonModule,
    MineRoutingModule,
    HeaderModule,
  ]
})
export class MineModule { }
