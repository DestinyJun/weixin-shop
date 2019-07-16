import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoyaoGoodsComponent } from './moyao-goods.component';
import {StepperModule} from '../stepper/stepper.module';

@NgModule({
  declarations: [MoyaoGoodsComponent],
  imports: [
    CommonModule,
    StepperModule
  ],
  exports: [MoyaoGoodsComponent]
})
export class MoyaoGoodsModule { }
