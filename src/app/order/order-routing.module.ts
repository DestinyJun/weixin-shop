import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderInvoiceComponent} from './order-invoice/order-invoice.component';
import {OrderSureComponent} from './order-sure/order-sure.component';
import {OrderPlaceComponent} from './order-place/order-place.component';
const tabRoutes: Routes = [
  {path: '', component: OrderPlaceComponent},
  {path: 'orinvoice/:id', component: OrderInvoiceComponent},
  {path: 'sure/:id', component: OrderSureComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
