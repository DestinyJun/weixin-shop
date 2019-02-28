import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineUserComponent } from './mine-user/mine-user.component';
import { MineSharedComponent } from './mine-shared/mine-shared.component';
import {MineRoutingModule} from './mine-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import { MineUserNameComponent } from './mine-user/mine-user-name/mine-user-name.component';
import { MineUserAddressComponent } from './mine-user/mine-user-address/mine-user-address.component';

@NgModule({
  declarations: [MineUserComponent, MineSharedComponent, MineUserNameComponent, MineUserAddressComponent],
  imports: [
    CommonModule,
    MineRoutingModule,
    HeaderModule,
    WeUiModule.forRoot()
  ]
})
export class MineModule { }
