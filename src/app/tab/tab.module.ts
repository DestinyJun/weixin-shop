import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabHomeComponent } from './tab-home/tab-home.component';
import {TabRoutingModule} from './tab-routing.module';
import {WeUiModule} from 'ngx-weui';
import { TabClientComponent } from './tab-client/tab-client.component';
import { TabMineComponent } from './tab-mine/tab-mine.component';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {GlobalService} from '../common/services/global.service';

@NgModule({
  declarations: [TabComponent, TabHomeComponent, TabClientComponent, TabMineComponent],
  imports: [
    CommonModule,
    WeUiModule.forRoot(),
    TabRoutingModule,
    HeaderModule,
    FormsModule
  ],
  providers: []
})
export class TabModule { }
