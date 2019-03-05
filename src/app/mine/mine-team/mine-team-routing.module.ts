import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineTeamComponent} from './mine-team.component';
import {TeamDetailComponent} from './team-detail/team-detail.component';
import {TeamPersonalComponent} from './team-personal/team-personal.component';
import {TeamBillComponent} from './team-bill/team-bill.component';
const tabRoutes: Routes = [
  {path: '', component: MineTeamComponent},
  {path: 'detail', component: TeamDetailComponent},
  {path: 'personal', component: TeamPersonalComponent},
  {path: 'bill', component: TeamBillComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineTeamRoutingModule {}
