import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredReferrerComponent } from './registered-referrer/registered-referrer.component';
import {RegisteredRoutingModule} from './registered-routing.module';
import { RegisteredSubmitComponent } from './registered-submit/registered-submit.component';
import {WeUiModule} from 'ngx-weui';
import {HeaderModule} from '../common/components/header/header.module';
import {NgxQRCodeModule} from '@cmgustavo/ngx-qrcode';

@NgModule({
  declarations: [RegisteredReferrerComponent, RegisteredSubmitComponent],
  imports: [
    CommonModule,
    RegisteredRoutingModule,
    WeUiModule.forRoot(),
    HeaderModule,
    NgxQRCodeModule
  ]
})
export class RegisteredModule { }
