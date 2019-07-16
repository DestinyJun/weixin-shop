import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepperComponent} from './stepper.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    StepperComponent
  ]
})
export class StepperModule { }
