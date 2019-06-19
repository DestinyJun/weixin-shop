import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientRoutingModule} from './client-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '../common/components/loading/loading.module';
import {ClientListComponent} from './client-list/client-list.component';
import { AddressListComponent } from './address-list/address-list.component';
import {AddressAddComponent} from './address-add/address-add.component';

@NgModule({
  declarations: [
    ClientAddComponent,
    ClientListComponent,
    AddressListComponent,
    AddressAddComponent
  ],
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
