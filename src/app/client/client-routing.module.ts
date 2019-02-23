import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientEditComponent} from './client-edit/client-edit.component';
const tabRoutes: Routes = [
  {path: 'add', component: ClientAddComponent},
  {path: 'edit', component: ClientEditComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
