import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MineTeamRoutingModule} from './mine-team-routing.module';
import {MineTeamComponent} from './mine-team.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import {FormsModule} from '@angular/forms';
import {HeaderModule} from '../../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {NgxEchartsModule} from 'ngx-echarts';
import {TeamPersonalComponent} from './team-personal/team-personal.component';
import { TeamBillComponent } from './team-bill/team-bill.component';

@NgModule({
  declarations: [MineTeamComponent, TeamDetailComponent, TeamPersonalComponent, TeamBillComponent],
  imports: [
    CommonModule,
    MineTeamRoutingModule,
    FormsModule,
    HeaderModule,
    WeUiModule.forRoot(),
    NgxEchartsModule
  ]
})
export class MineTeamModule { }
