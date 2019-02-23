import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabComponent} from './tab.component';
import {TabHomeComponent} from './tab-home/tab-home.component';
import {TabClientComponent} from './tab-client/tab-client.component';
import {TabMineComponent} from './tab-mine/tab-mine.component';
const tabRoutes: Routes = [
  {
    path: '',
    component: TabComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: TabHomeComponent},
      {path: 'client', component: TabClientComponent},
      {path: 'mine', component: TabMineComponent},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class TabRoutingModule {}
