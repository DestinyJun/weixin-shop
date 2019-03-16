import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientAddComponent} from './client-add/client-add.component';
const tabRoutes: Routes = [
  {path: 'add', component: ClientAddComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
