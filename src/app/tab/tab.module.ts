import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { HomeComponent } from './home/home.component';
import {TabRoutingModule} from './tab-routing.module';
import {WeUiModule} from 'ngx-weui';
import { ClientComponent } from './client/client.component';
import { TabMineComponent } from './tab-mine/tab-mine.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

@NgModule({
  declarations: [TabComponent, HomeComponent, ClientComponent, TabMineComponent, ClientAddComponent, ClientEditComponent],
  imports: [
    CommonModule,
    WeUiModule.forRoot(),
    TabRoutingModule
  ],
  providers: []
})
export class TabModule { }
