import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorRemindComponent} from './error-remind/error-remind.component';
import {LoginGuard} from './common/guard/login.guard';

const routes: Routes = [
  {path: 'registered', loadChildren: './registered/registered.module#RegisteredModule'},
  {path: 'tab', canActivate: [LoginGuard], loadChildren: './tab/tab.module#TabModule'},
  {path: 'order', canActivate: [LoginGuard], loadChildren: './order/order.module#OrderModule'},
  {path: 'pay', canActivate: [LoginGuard], loadChildren: './pay/pay.module#PayModule'},
  {path: 'mine', canActivate: [LoginGuard], loadChildren: './mine/mine.module#MineModule'},
  {path: 'client', canActivate: [LoginGuard], loadChildren: './client/client.module#ClientModule'},
  {path: 'error', component: ErrorRemindComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
