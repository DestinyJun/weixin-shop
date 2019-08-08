import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressRoutingModule} from './address-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '../common/components/loading/loading.module';
import { AddressListComponent } from './address-list/address-list.component';
import {AddressAddComponent} from './address-add/address-add.component';

@NgModule({
  declarations: [
    AddressListComponent,
    AddressAddComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    FormsModule,
    LoadingModule
  ]
})
export class AddressModule { }
