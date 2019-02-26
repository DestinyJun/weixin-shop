import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {ClientRoutingModule} from './client-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ClientAddComponent, ClientEditComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    FormsModule,
  ]
})
export class ClientModule { }
