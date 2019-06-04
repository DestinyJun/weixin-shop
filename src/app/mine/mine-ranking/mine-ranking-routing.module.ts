import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MineRankingComponent} from './mine-ranking.component';

const routes: Routes = [
  {path: '', component: MineRankingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MineRankingRoutingModule { }
