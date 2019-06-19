import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientListComponent} from './client-list/client-list.component';
import {ClientAddressComponent} from './client-address/client-address.component';
const tabRoutes: Routes = [
  {path: 'add', component: ClientAddComponent},
  {path: 'list', component: ClientListComponent},
  {path: 'address', component: ClientAddressComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
