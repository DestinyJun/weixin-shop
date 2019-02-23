import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/tab/home', pathMatch: 'full'},
  {path: 'registered', loadChildren: './registered/registered.module#RegisteredModule'},
  {path: 'tab', loadChildren: './tab/tab.module#TabModule'},
  {path: 'order', loadChildren: './order/order.module#OrderModule'},
  {path: 'pay', loadChildren: './pay/pay.module#PayModule'},
  {path: 'mine', loadChildren: './mine/mine.module#MineModule'},
  {path: 'client', loadChildren: './client/client.module#ClientModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
