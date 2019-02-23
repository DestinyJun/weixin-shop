import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineOrderComponent} from './mine-order.component';
const tabRoutes: Routes = [
  {path: '', component: MineOrderComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineOrderRoutingModule {}
