import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddressListComponent} from './address-list/address-list.component';
import {AddressAddComponent} from './address-add/address-add.component';
const tabRoutes: Routes = [
  {path: 'address', component: AddressListComponent},
  {path: 'addition', component: AddressAddComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {}
