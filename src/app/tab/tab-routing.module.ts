import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabComponent} from './tab.component';
import {TabHomeComponent} from './tab-home/tab-home.component';
import {TabMineComponent} from './tab-mine/tab-mine.component';
import {TabProductComponent} from './tab-product/tab-product.component';
import {TabOrderComponent} from './tab-order/tab-order.component';
const tabRoutes: Routes = [
  {
    path: '',
    component: TabComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: TabHomeComponent},
      {path: 'order', component: TabOrderComponent},
      {path: 'product', component: TabProductComponent},
      {path: 'mine', component: TabMineComponent},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class TabRoutingModule {}
