import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MineTeamRoutingModule} from './mine-team-routing.module';
import {MineTeamComponent} from './mine-team.component';
import { TeamEarningComponent } from './team-earning/team-earning.component';
import { TeamFiltrateComponent } from './team-filtrate/team-filtrate.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamInviteComponent } from './team-invite/team-invite.component';
import {FormsModule} from '@angular/forms';
import {HeaderModule} from '../../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {NgxEchartsModule} from 'ngx-echarts';
import { MineDetailPersonalComponent } from './mine-detail-personal/mine-detail-personal.component';

@NgModule({
  declarations: [MineTeamComponent, TeamEarningComponent, TeamFiltrateComponent, TeamDetailComponent, TeamInviteComponent, MineDetailPersonalComponent],
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
