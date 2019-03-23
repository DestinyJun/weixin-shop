import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {InfiniteLoaderConfig} from 'ngx-weui';
import {Observable} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-aftsale',
  templateUrl: './order-aftsale.component.html',
  styleUrls: ['./order-aftsale.component.less']
})
export class OrderAftsaleComponent implements OnInit {
// header
  public headerOption: HeaderContent = {
    title: '选择服务类型',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // scroll
  ordAftScrollConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  // details
  public orderDetailsData: Observable<any>;
  constructor(
    private mOrderSrv: MineOrderService,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerInfo.params.subscribe(params => this.mineOrdDetailInit(params.id));
  }
  public mineOrdDetailInit (id): void {
    this.orderDetailsData = this.mOrderSrv.mineOrdGetDetail({orderId: id});
  }
}
