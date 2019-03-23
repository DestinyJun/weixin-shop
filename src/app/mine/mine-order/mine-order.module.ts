import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineOrderComponent } from './mine-order.component';
import {MineOrderRoutingModule} from './mine-order-routing.module';
import { OrderPendpayComponent } from './order-pendpay/order-pendpay.component';
import { OrderPendreceComponent } from './order-pendrece/order-pendrece.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderLogisticsComponent } from './order-logistics/order-logistics.component';
import {HeaderModule} from '../../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';
import { OrderAftsaleComponent } from './order-aftsale/order-aftsale.component';
import { OrderRetreatComponent } from './order-retreat/order-retreat.component';

@NgModule({
  declarations: [
    MineOrderComponent,
    OrderPendpayComponent,
    OrderPendreceComponent,
    OrderCompleteComponent,
    OrderDetailsComponent,
    OrderLogisticsComponent,
    OrderAftsaleComponent,
    OrderRetreatComponent
  ],
  imports: [
    CommonModule,
    MineOrderRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    FormsModule
  ]
})
export class MineOrderModule { }
