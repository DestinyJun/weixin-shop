import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WjDialogComponent } from './wj-dialog.component';

@NgModule({
  declarations: [WjDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [WjDialogComponent]
})
export class WjDialogModule { }
