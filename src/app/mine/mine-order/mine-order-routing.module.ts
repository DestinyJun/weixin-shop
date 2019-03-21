import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineOrderComponent} from './mine-order.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
const tabRoutes: Routes = [
  {path: '', component: MineOrderComponent},
  {path: 'detail/:id', component: OrderDetailsComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineOrderRoutingModule {}
