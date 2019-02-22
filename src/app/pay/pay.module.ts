import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayWayComponent } from './pay-way/pay-way.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';
import { PayPasswordComponent } from './pay-password/pay-password.component';
import {PayRoutingModule} from './pay-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {DialogPayModule} from '../common/components/dialog-pay/dialog-pay.module';
import {WeUiModule} from 'ngx-weui';

@NgModule({
  declarations: [PayWayComponent, PaySuccessComponent, PayPasswordComponent],
  imports: [
    CommonModule,
    PayRoutingModule,
    HeaderModule,
    FormsModule,
    DialogPayModule,
    WeUiModule.forRoot(),
  ]
})
export class PayModule { }
