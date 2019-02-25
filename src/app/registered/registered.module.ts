import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredReferrerComponent } from './registered-referrer/registered-referrer.component';
import {RegisteredRoutingModule} from './registered-routing.module';
import { RegisteredSubmitComponent } from './registered-submit/registered-submit.component';
import {WeUiModule} from 'ngx-weui';
import {HeaderModule} from '../common/components/header/header.module';
import {NgxQRCodeModule} from '@cmgustavo/ngx-qrcode';
import { RegisteredCameraComponent } from './registered-camera/registered-camera.component';
import { RegisteredSuccessComponent } from './registered-success/registered-success.component';
import {FormsModule} from '@angular/forms';
import {DialogPayModule} from '../common/components/dialog-pay/dialog-pay.module';

@NgModule({
  declarations: [RegisteredReferrerComponent, RegisteredSubmitComponent, RegisteredCameraComponent, RegisteredSuccessComponent],
  imports: [
    CommonModule,
    RegisteredRoutingModule,
    WeUiModule.forRoot(),
    HeaderModule,
    FormsModule,
    DialogPayModule
  ]
})
export class RegisteredModule { }
