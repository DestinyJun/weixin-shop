import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientListComponent} from './client-list/client-list.component';
import {AddressListComponent} from './address-list/address-list.component';
import {AddressAddComponent} from './address-add/address-add.component';
const tabRoutes: Routes = [
  {path: 'add', component: ClientAddComponent},
  {path: 'list', component: ClientListComponent},
  {path: 'address', component: AddressListComponent},
  {path: 'addition', component: AddressAddComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
