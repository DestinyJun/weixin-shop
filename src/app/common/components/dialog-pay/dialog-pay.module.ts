import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPayComponent } from './dialog-pay.component';
import {DialogPayRoutingModule} from './dialog-pay-routing.module';

@NgModule({
  declarations: [DialogPayComponent],
  imports: [
    CommonModule,
    DialogPayRoutingModule
  ],
  exports: [DialogPayComponent]
})
export class DialogPayModule { }
