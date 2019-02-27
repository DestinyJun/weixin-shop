import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DialogPayComponent} from './dialog-pay.component';
const tabRoutes: Routes = [
  {path: '', component: DialogPayComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class DialogPayRoutingModule {}
