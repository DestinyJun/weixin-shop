import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabHomeComponent } from './tab-home/tab-home.component';
import {TabRoutingModule} from './tab-routing.module';
import {WeUiModule} from 'ngx-weui';
import { TabMineComponent } from './tab-mine/tab-mine.component';
import {HeaderModule} from '../common/components/header/header.module';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '../common/components/loading/loading.module';
import { TabProductComponent } from './tab-product/tab-product.component';
import {TabOrderComponent} from './tab-order/tab-order.component';

@NgModule({
  declarations: [
    TabComponent,
    TabHomeComponent,
    TabMineComponent,
    TabProductComponent,
    TabOrderComponent
  ],
  imports: [
    CommonModule,
    WeUiModule.forRoot(),
    TabRoutingModule,
    HeaderModule,
    FormsModule,
    LoadingModule
  ],
  providers: []
})
export class TabModule { }
