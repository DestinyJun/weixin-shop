import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderConfig} from 'ngx-weui';
import {OrderService} from '../../common/services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-sure',
  templateUrl: './order-sure.component.html',
  styleUrls: ['./order-sure.component.less']
})
export class OrderSureComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '确认订单',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      icon: ''
    }
  };
  // goods
  public goodsInfo = [
   {mainImage: 'assets/images/weui-img.png', title: '八宝五胆药墨（一锭）', info: '八宝五胆药墨简介', originalPrice: 100.00, amount: 0},
   {mainImage: 'assets/images/weui-img.png', title: '八宝五胆药墨（二锭）', info: '八宝五胆药墨简介', originalPrice: 200.00, amount: 0},
 ];
  public orderDetail: Observable<any>;
  // scroll
  infiniteloaderConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  constructor(
    private orderSrv: OrderService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routerInfo.params.subscribe(params => this.orderSureInit(params.id));
  }
  public orderSureInit (id): void {
    this.orderDetail = this.orderSrv.orderGetDetail({orderId: id});
  }
  // order sure
  public orderSureClick(id) {
    console.log(id);
    this.router.navigate(['/pay/sure']);
  }
}
