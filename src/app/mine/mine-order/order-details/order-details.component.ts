import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {Observable} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute} from '@angular/router';
import {InfiniteLoaderConfig} from 'ngx-weui';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '订单详情',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // scroll
  ordDeilScrollConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  // details list
  public detailsData: Observable<any>;
  // order list
  public goodsInfo = [
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（一锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 100.00, amount: 0},
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（二锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 200.00, amount: 0},
  ];
  public payStatus = 1;


  constructor(
    private mOrderSrv: MineOrderService,
    private routerInfo: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routerInfo.params.subscribe(params => this.mineOrdDetailInit(params.id));
  }
  public mineOrdDetailInit (id): void {
    this.detailsData = this.mOrderSrv.mineOrdGetDetail({orderId: id});
  }
}
