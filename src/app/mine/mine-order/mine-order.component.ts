import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig, ToastComponent, ToastService} from 'ngx-weui';
import {MineOrderService} from '../../common/services/mine-order.service';
import {GlobalService} from '../../common/services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mine-order',
  templateUrl: './mine-order.component.html',
  styleUrls: ['./mine-order.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineOrderComponent implements OnInit {
  // new date
  public mOrderNewDate = new Date();
  // header
  public headerOption: HeaderContent = {
    title: '我的订单',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // order select
  public mOrderStatusList: any = [
    {name: '全部', amount: 0, status: 'all'},
    {name: '待付款', amount: 0, status: 'pendingPayment'},
    {name: '待收货', amount: 0, status: 'shipped'},
    {name: '已完成', amount: 0, status: 'completed'},
    {name: '退货', amount: 0, status: 'return'},
  ];
  public orderSelectStatus: any = null;
  // order list
  public mOrderList: any = null;
  // order status
  public orderStates: any = {
    pendingPayment: {name: '待付款', color: '#F28382', services: '',
      operating: [{title: '取消订单', routes: ''}, {title: '去付款', routes: '/pay/sure'}]},
    pendingShipment: {name: '待发货', color: '#73B0F3', services: '退款/售后', operating: []},
    shipped: {name: '待收货', color: '#69AAF2', services: '退款/售后',
      operating: [{title: '查看物流', routes: ''}, {title: '确认收货', routes: null}]},
    received: {name: '已收货', color: 'red', services: '退款/售后', operating: []},
    completed: {name: '已完成', color: '#7AB4F3', services: '退款/售后', operating: [{title: '再下一单', routes: '/order'}]},
    canceled: {name: '已取消', color: '#A0A0A0', services: '', operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: '/order'}]},
    failed: {name: '已取消', color: '#A0A0A0', services: '', operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: '/order'}]},

    refundReview: {name: '退款审核', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},
    refundding: {name: '退款中', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},
    refundded: {name: '已退款', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退款进度', routes: '/mine/order/refund'}]},

    goodsReturnReview: {name: '退货退款审核', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    uploadVoucher: {name: '上传凭证', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    receiveGoodsReturn: {name: '卖家收到退货', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    goodsReturning: {name: '退货中', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},
    goodsReturned: {name: '已退货', color: '#F28382', services: '',
      operating: [{title: '再次购买', routes: '/order'}, {title: '退货进度', routes: '/mine/order/return'}]},

    pendingReview: {name: '待审核', color: '#F28382', services: '', operating: []},
  };
  // scroll
  @ViewChild(InfiniteLoaderComponent) il;
  mOrderLoaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  // toast
  @ViewChild('mineOrderToast') mineOrderToast: ToastComponent;
  public mineOrderMsg: string;

  constructor(
    private globalSrv: GlobalService,
    private mOrderSrv: MineOrderService,
    private router: Router,
    private srv: ToastService,
  ) {
  }

  ngOnInit() {
    this.orderSelectStatus = this.globalSrv.wxSessionGetObject('orderSelectStatus');
    if (this.orderSelectStatus === 'all') {
      this.mOrderInit({currentPage: '1'});
    } else {
      this.mOrderInit({currentPage: '1', status: this.orderSelectStatus});
    }
  }
  // init
  public mOrderInit(param): void {
    this.mOrderList = null;
    this.mOrderSrv.mineOrdGetNum().subscribe(
      (val) => {
        if (val.status === 200) {
          Object.keys(val.dataObject).forEach((prop) => {
            this.mOrderStatusList.map((item) => {
              if (item.status === prop) {
                item.amount = val.dataObject[prop];
              }
            });
          });
        }
      }
    );
    this.mOrderSrv.getMineOrderList(param).subscribe(
      (val) => {
        if (val.status === 200 ) {
          this.mOrderSerialization(val.datas);
        } else {
          this.mOrderList = [];
        }
      }
    );
  }
  // scroll
  public mOrderLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
  // client Serialization
  public mOrderSerialization(params): void {
    this.mOrderList = [];
    const a = [];
    const b = [];
    params.map((item) => {
      b.push(item.createdDate.slice(0, 10));
    });
    for (const s in b) {
      if (b) {
        if (a.indexOf(b[s]) < 0) {
          a.push(b[s]);
        }
      }
    }
    a.map((val) => {
      const c = [];
      params.map((pItem) => {
        if (pItem.createdDate.slice(0, 10) === val) {
          c.push(pItem);
        }
      });
      this.mOrderList.push({times: val, value: c });
    });
  }
  // select status
  public mOrderStatusSelect (status): void {
    this.globalSrv.wxSessionSetObject('orderSelectStatus', status);
    this.orderSelectStatus = status;
    if (!status) {
      this.mOrderInit({currentPage: '1'});
      return;
    }
    if (status === 'all') {
      this.mOrderInit({currentPage: '1'});
      return;
    }
    this.mOrderInit({currentPage: '1', status: status});
  }
  // order operate
  public mineOrderOperate(param, childItem, status): void {
    console.log(childItem);
    if (param.title === '退货进度') {
      if (status === 'refundReview' || status === 'refundding' || status === 'refundded') {
        this.router.navigate([param.routes, childItem.id, 0, status]);
        return;
      }
      this.router.navigate([param.routes, childItem.id, 1, status]);
      return;
    }
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
    if (param.title === '再次购买') {
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
    if (param.title === '取消订单') {
      this.srv.loading();
      this.mOrderSrv.mineOrdCancel({orderId: childItem.id}).subscribe(
        (val) => {
          this.srv.hide();
          if (val.status === 200) {
            this.mineOrderMsg = val.message;
            this.onShow('mineOrder');
            this.mOrderInit({currentPage: '1', status: this.orderSelectStatus});
            return;
          }
          this.mineOrderMsg = val.message;
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
          if (val.status === 200) {
            this.mineOrderMsg = val.message;
            this.onShow('mineOrder');
            this.mOrderInit({currentPage: '1'});
            return;
          }
          this.mineOrderMsg = val.message;
          this.onShow('mineOrder');
        }
      );
      return;
    }
  }
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
