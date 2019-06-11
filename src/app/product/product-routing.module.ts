import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductAdComponent} from './product-ad/product-ad.component';

const routes: Routes = [
  {path: '', component: ProductDetailComponent},
  {path: 'ad', component: ProductAdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
