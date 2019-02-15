import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {WeUiModule} from 'ngx-weui';
import { OrderPlaceComponent } from './order-place/order-place.component';
import { OrderClientComponent } from './order-client/order-client.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';

@NgModule({
  declarations: [OrderPlaceComponent, OrderClientComponent, OrderInvoiceComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    WeUiModule.forRoot(),
  ]
})
export class OrderModule { }
