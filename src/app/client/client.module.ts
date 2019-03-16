import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientRoutingModule} from './client-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {FormsModule} from '@angular/forms';
import {WjDialogModule} from '../common/components/wj-dialog/wj-dialog.module';

@NgModule({
  declarations: [ClientAddComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    FormsModule,
    WjDialogModule
  ]
})
export class ClientModule { }
