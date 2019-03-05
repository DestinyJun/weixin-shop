import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineTeamComponent} from './mine-team.component';
import {TeamDetailComponent} from './team-detail/team-detail.component';
import {TeamEarningComponent} from './team-earning/team-earning.component';
import {TeamFiltrateComponent} from './team-filtrate/team-filtrate.component';
import {TeamInviteComponent} from './team-invite/team-invite.component';
import {MineDetailPersonalComponent} from './mine-detail-personal/mine-detail-personal.component';
const tabRoutes: Routes = [
  {path: '', component: MineTeamComponent},
  {path: 'detail', component: TeamDetailComponent},
  {path: 'earning', component: TeamEarningComponent},
  {path: 'filtrate', component: TeamFiltrateComponent},
  {path: 'invite', component: TeamInviteComponent},
  {path: 'personal', component: MineDetailPersonalComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineTeamRoutingModule {}
