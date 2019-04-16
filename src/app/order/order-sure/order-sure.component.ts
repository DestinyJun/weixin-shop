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
  // data
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
    this.router.navigate(['/pay/sure'], {queryParams: {orderId: id}});
  }
}
