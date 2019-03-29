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
  // order status
  public orderDetailStates: any = {
    shippe: {name: '待收货', bgColor: ['#80B66F', '#B0F49A'], services: '申请退款',
      operating: [{title: '查看物流', routes: ''}, {title: '确认收货', routes: ''}]},
    pendingPayment: {name: '待付款', bgColor: ['#B66F6E', '#F49C9A'], services: '',
      operating: [{title: '取消订单', routes: ''}, {title: '去付款', routes: '/pay/sure'}]},
    completed: {name: '已完成', bgColor: ['#80B66F', '#B0F49A'], services: '申请退款',
      operating: [{title: '删除订单', routes: ''}, {title: '再下一单', routes: ''}]},
    canceled: {name: '已取消', bgColor: ['#8E8E8E', '#C2C2C2'], services: '',
      operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: ''}]},
    refundding: {name: '退款中', bgColor: ['#B66F6E', '#F49C9A'], services: '',
      operating: [{title: '再次购买', routes: ''}, {title: '退款进度', routes: ''}]},
    goodsReturning: {name: '退货中', bgColor: ['#B66F6E', '#F49C9A'], services: '',
      operating: [{title: '再次购买', routes: ''}, {title: '退款进度', routes: ''}]},

    pendingShipment: {name: '待发货', bgColor: ['#B66F6E', '#F49C9A'], services: '', operating: []},
    pendingReview: {name: '待审核', bgColor: ['#B66F6E', '#F49C9A'], operating: []},
    received: {name: '已收货', bgColor: [], operating: ['#80B66F', '#B0F49A']},
    refundReview: {name: '退款审核', bgColor: ['#B66F6E', '#F49C9A'], operating: []},
    refundded: {name: '已退款', bgColor: ['#B66F6E', '#F49C9A'], operating: []},
    goodsReturnReview: {name: '退货审核', bgColor: ['#B66F6E', '#F49C9A'], operating: []},
    goodsReturned: {name: '已退货', bgColor: ['#B66F6E', '#F49C9A'], operating: []},
  };


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
