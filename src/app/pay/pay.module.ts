import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayWayComponent } from './pay-way/pay-way.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { PayPasswordComponent } from './pay-password/pay-password.component';
import {PayRoutingModule} from './pay-routing.module';
import {HeaderModule} from '../common/components/header/header.module';

@NgModule({
  declarations: [PayWayComponent, PaySuccessComponent, PayPasswordComponent],
  imports: [
    CommonModule,
    PayRoutingModule,
    HeaderModule,
  ]
})
export class PayModule { }
