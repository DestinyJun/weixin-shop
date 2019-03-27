import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineOrderComponent} from './mine-order.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {OrderAftsaleComponent} from './order-aftsale/order-aftsale.component';
import {OrderRefundComponent} from './order-refund/order-refund.component';
import {OrderReturnComponent} from './order-return/order-return.component';
const tabRoutes: Routes = [
  {path: '', component: MineOrderComponent},
  {path: 'detail/:id', component: OrderDetailsComponent},
  {path: 'aftsale/:id', component: OrderAftsaleComponent},
  {path: 'refund/:id', component: OrderRefundComponent},
  {path: 'return/:id', component: OrderReturnComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineOrderRoutingModule {}
