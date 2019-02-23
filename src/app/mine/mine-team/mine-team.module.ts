import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MineTeamRoutingModule} from './mine-team-routing.module';
import {MineTeamComponent} from './mine-team.component';
import { TeamEarningComponent } from './team-earning/team-earning.component';
import { TeamFiltrateComponent } from './team-filtrate/team-filtrate.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamInviteComponent } from './team-invite/team-invite.component';

@NgModule({
  declarations: [MineTeamComponent, TeamEarningComponent, TeamFiltrateComponent, TeamDetailComponent, TeamInviteComponent],
  imports: [
    CommonModule,
    MineTeamRoutingModule
  ]
})
export class MineTeamModule { }
