import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderPlaceComponent} from './order-place/order-place.component';
import {OrderClientComponent} from './order-client/order-client.component';
import {OrderInvoiceComponent} from './order-invoice/order-invoice.component';
const tabRoutes: Routes = [
  {path: '', component: OrderPlaceComponent},
  {path: 'orclient', component: OrderClientComponent},
  {path: 'orinvoice', component: OrderInvoiceComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
