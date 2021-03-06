import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineOrderComponent } from './mine-order.component';
import {MineOrderRoutingModule} from './mine-order-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderLogisticsComponent } from './order-logistics/order-logistics.component';
import {HeaderModule} from '../../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';
import { OrderAftsaleComponent } from './order-aftsale/order-aftsale.component';
import { OrderRefundComponent } from './order-refund/order-refund.component';
import { OrderReturnComponent } from './order-return/order-return.component';
import {LoadingModule} from '../../common/components/loading/loading.module';

@NgModule({
  declarations: [
    MineOrderComponent,
    OrderDetailsComponent,
    OrderLogisticsComponent,
    OrderAftsaleComponent,
    OrderRefundComponent,
    OrderReturnComponent
  ],
  imports: [
    CommonModule,
    MineOrderRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    FormsModule,
    LoadingModule
  ]
})
export class MineOrderModule { }
