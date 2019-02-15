import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabComponent} from './tab.component';
import {HomeComponent} from './home/home.component';
import {ClientComponent} from './client/client.component';
import {TabMineComponent} from './tab-mine/tab-mine.component';
const tabRoutes: Routes = [
  {
    path: '',
    component: TabComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'client', component: ClientComponent},
      {path: 'mine', component: TabMineComponent},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class TabRoutingModule {}
