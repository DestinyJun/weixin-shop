import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PayWayComponent} from './pay-way/pay-way.component';
import {PaySuccessComponent} from './pay-success/pay-success.component';
const payRoutes: Routes = [
  {path: 'sure', component: PayWayComponent},
  {path: 'success', component: PaySuccessComponent},
];
@NgModule({
  imports: [RouterModule.forChild(payRoutes)],
  exports: [RouterModule]
})
export class PayRoutingModule {}
