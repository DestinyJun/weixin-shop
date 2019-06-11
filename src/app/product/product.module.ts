import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import {ProductAdComponent} from './product-ad/product-ad.component';
@NgModule({
  declarations: [ProductDetailComponent, ProductAdComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SwiperModule,
    HeaderModule,
    WeUiModule.forRoot(),
  ],
  providers: []
})
export class ProductModule { }
