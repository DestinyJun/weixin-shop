import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredReferrerComponent } from './registered-referrer/registered-referrer.component';
import {RegisteredRoutingModule} from './registered-routing.module';
import { RegisteredSubmitComponent } from './registered-submit/registered-submit.component';
import {WeUiModule} from 'ngx-weui';
import {HeaderModule} from '../common/components/header/header.module';
import { RegisteredSuccessComponent } from './registered-success/registered-success.component';
import {FormsModule} from '@angular/forms';
import {DialogPayModule} from '../common/components/dialog-pay/dialog-pay.module';
import {LoadingModule} from '../common/components/loading/loading.module';

@NgModule({
  declarations: [
    RegisteredReferrerComponent,
    RegisteredSubmitComponent,
    RegisteredSuccessComponent
  ],
  imports: [
    CommonModule,
    RegisteredRoutingModule,
    HeaderModule,
    FormsModule,
    DialogPayModule,
    WeUiModule.forRoot(),
    LoadingModule
  ]
})
export class RegisteredModule { }
