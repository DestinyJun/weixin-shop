import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PayWayComponent} from './pay-way/pay-way.component';
import {PaySuccessComponent} from './pay-success/pay-success.component';
import {PayPasswordComponent} from './pay-password/pay-password.component';
const payRoutes: Routes = [
  {path: 'sure/:total', component: PayWayComponent},
  {path: 'success', component: PaySuccessComponent},
  {path: 'resetpwd', component: PayPasswordComponent},
];
@NgModule({
  imports: [RouterModule.forChild(payRoutes)],
  exports: [RouterModule]
})
export class PayRoutingModule {}
