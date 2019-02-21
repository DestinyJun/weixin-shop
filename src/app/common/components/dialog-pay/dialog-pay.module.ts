import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPayComponent } from './dialog-pay.component';
import {DiaPayRoutingModule} from './dia-pay-routing.module';

@NgModule({
  declarations: [DialogPayComponent],
  imports: [
    CommonModule,
    DiaPayRoutingModule
  ],
  exports: [DialogPayComponent]
})
export class DialogPayModule { }
