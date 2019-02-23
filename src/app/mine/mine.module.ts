import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineUserComponent } from './mine-user/mine-user.component';
import { MineSharedComponent } from './mine-shared/mine-shared.component';
import {MineRoutingModule} from './mine-routing.module';

@NgModule({
  declarations: [MineUserComponent, MineSharedComponent],
  imports: [
    CommonModule,
    MineRoutingModule,
  ]
})
export class MineModule { }
