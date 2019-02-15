import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PayWayComponent} from './pay-way/pay-way.component';
const payRoutes: Routes = [
  {path: '', component: PayWayComponent},
];
@NgModule({
  imports: [RouterModule.forChild(payRoutes)],
  exports: [RouterModule]
})
export class PayRoutingModule {}
