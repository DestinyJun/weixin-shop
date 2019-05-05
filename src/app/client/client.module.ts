import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientRoutingModule} from './client-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '../common/components/loading/loading.module';

@NgModule({
  declarations: [ClientAddComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    FormsModule,
    LoadingModule
  ]
})
export class ClientModule { }
