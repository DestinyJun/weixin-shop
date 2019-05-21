import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InfiniteLoaderConfig, ToastComponent, ToastService} from 'ngx-weui';
import {GlobalService} from '../../../common/services/global.service';

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
  public ordDeilScrollConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  // toast
  @ViewChild('mineOrderToast') mineOrderToast: ToastComponent;
  public mineOrderMsg: string;
  // details list
  public detailsData: Observable<any>;
  // order status
  public orderDetailStates: any = {
    pendingPayment: {name: '待付款', bgColor: ['#B66F6E', '#F49C9A'], services: '',
      operating: [{title: '取消订单', routes: ''}, {title: '去付款', routes: '/pay/sure'}]},
    pendingShipment: {name: '待发货', bgColor: ['#B66F6E', '#F49C9A'], services: '申请退款', operating: []},
    shipped: {name: '待收货', bgColor: ['#80B66F', '#B0F49A'], services: '申请退款',
      operating: [{title: '查看物流', routes: ''}, {title: '确认收货', routes: ''}]},
    received: {name: '已收货', bgColor: [], operating: ['#80B66F', '#B0F49A']},
    completed: {name: '已完成', bgColor: ['#80B66F', '#B0F49A'], services: '申请退款',
      operating: [{title: '再下一单', routes: '/order'}]},
    canceled: {name: '已取消', bgColor: ['#8E8E8E', '#C2C2C2'], services: '',
      operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: ''}]},
    failed: {name: '已取消', bgColor: ['#8E8E8E', '#C2C2C2'], services: '',
      operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: ''}]},

    goodsReturnReview: {name: '退货退款审核中...', bgColor: ['#B66F6E', '#F49C9A'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    goodsReturning: {name: '退货中', bgColor: ['#B66F6E', '#F49C9A'], services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    goodsReturned: {name: '已退货', bgColor: ['#B66F6E', '#F49C9A'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},

    refundReview: {name: '退款审核中', bgColor: ['#B66F6E', '#F49C9A'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},
    refundding: {name: '退款中', bgColor: ['#B66F6E', '#F49C9A'], services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},
    refundded: {name: '已退款', bgColor: ['#B66F6E', '#F49C9A'],
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},

    pendingReview: {name: '待审核', bgColor: ['#B66F6E', '#F49C9A'], operating: []}};


  constructor(
    private mOrderSrv: MineOrderService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private srv: ToastService,
    private globalSrv: GlobalService,
  ) {}

  ngOnInit() {
    this.routerInfo.params.subscribe(params => this.mineOrdDetailInit(params.id));
  }
  public mineOrdDetailInit (id): void {
    this.detailsData = this.mOrderSrv.mineOrdGetDetail({orderId: id});
  }
  // order operate
  public orderDetailOpeClick(param, childItem, status): void {
    console.log(childItem);
    if (param.title === '退款进度') {
      if (status === 'refundReview' || status === 'refundding' || status === 'refundded') {
        this.router.navigate([param.routes, childItem.id, 0, status]);
        return;
      }
      this.router.navigate([param.routes, childItem.id, 1, status]);
      return;
    }
    if (param.title === '去付款') {
      this.router.navigate([param.routes], {queryParams: {orderId: childItem.id}});
      return;
    }
    if (param.title === '确认收货') {
      this.mOrderSrv.mineOrdFinish({orderId: childItem.id}).subscribe(
        (val) => {
          console.log(val);
          if (val.status === 200) {
          }
        }
      );
      return;
    }
    if (param.title === '再下一单') {
      childItem.moyaoOrderItemModels.map((prop, index) => {
        this.globalSrv.wxSessionSetObject(`goods${index}`, prop.quantity);
      });
      this.router.navigate([param.routes]);
      return;
    }
    if (param.title === '重新购买') {
      childItem.moyaoOrderItemModels.map((prop, index) => {
        this.globalSrv.wxSessionSetObject(`goods${index}`, prop.quantity);
      });
      this.router.navigate([param.routes]);
      return;
    }
    if (param.title === '再次购买') {
      childItem.moyaoOrderItemModels.map((prop, index) => {
        this.globalSrv.wxSessionSetObject(`goods${index}`, prop.quantity);
      });
      this.router.navigate([param.routes]);
      return;
    }
    if (param.title === '取消订单') {
      console.log('取消订单');
      this.srv.loading();
      this.mOrderSrv.mineOrdCancel({orderId: childItem.id}).subscribe(
        (val) => {
          this.srv.hide();
          console.log(val);
          if (val.status === 200) {
            this.mineOrderMsg = val.message;
            this.onShow('mineOrder');
            timer(2000).subscribe(() => window.history.back());
            return;
          }
          this.mineOrderMsg = `${val.message},错误码：${val.status}`;
          this.onShow('mineOrder');
        }
      );
      return;
    }
    if (param.title === '删除订单') {
      this.srv.loading();
      this.mOrderSrv.mineOrdDelete({orderId: childItem.id}).subscribe(
        (val) => {
          this.srv.hide();
          console.log(val);
          if (val.status === 200) {
            this.mineOrderMsg = val.message;
            this.onShow('mineOrder');
            timer(2000).subscribe(() => window.history.back());
            return;
          }
          this.mineOrderMsg = `${val.message},错误码：${val.status}`;
          this.onShow('mineOrder');
        }
      );
      return;
    }
  }
  // toast
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
