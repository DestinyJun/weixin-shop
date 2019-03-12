import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {WeUiModule} from 'ngx-weui';
import { OrderPlaceComponent } from './order-place/order-place.component';
import { OrderClientComponent } from './order-client/order-client.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {GlobalService} from '../common/services/global.service';

@NgModule({
  declarations: [OrderPlaceComponent, OrderClientComponent, OrderInvoiceComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    WeUiModule.forRoot(),
    HeaderModule,
    FormsModule,
  ],
  providers: []
})
export class OrderModule { }
