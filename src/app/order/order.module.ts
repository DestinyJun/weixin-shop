import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {WeUiModule} from 'ngx-weui';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import { OrderSureComponent } from './order-sure/order-sure.component';
import {LoadingModule} from '../common/components/loading/loading.module';
import {OrderPlaceComponent} from './order-place/order-place.component';
import {MoyaoGoodsModule} from '../common/components/moyao-goods/moyao-goods.module';

@NgModule({
  declarations: [
    OrderInvoiceComponent,
    OrderSureComponent,
    OrderPlaceComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    WeUiModule.forRoot(),
    HeaderModule,
    FormsModule,
    LoadingModule,
    MoyaoGoodsModule
  ],
  providers: []
})
export class OrderModule { }
