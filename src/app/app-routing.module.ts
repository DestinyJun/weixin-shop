import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorRemindComponent} from './error-remind/error-remind.component';

const routes: Routes = [
  {path: 'registered', loadChildren: './registered/registered.module#RegisteredModule'},
  {path: 'tab', loadChildren: './tab/tab.module#TabModule'},
  {path: 'order', loadChildren: './order/order.module#OrderModule'},
  {path: 'pay', loadChildren: './pay/pay.module#PayModule'},
  {path: 'mine', loadChildren: './mine/mine.module#MineModule'},
  {path: 'client', loadChildren: './client/client.module#ClientModule'},
  {path: 'error', component: ErrorRemindComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
