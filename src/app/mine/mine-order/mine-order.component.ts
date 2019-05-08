import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
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
      icon: 'fa fa-chevron-left'
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
  // order list
  public mOrderList: any = null;
  // order status
  public orderStates: any = {
    shipped: {name: '待收货', color: '#7FB56E', operating: [{title: '查看物流', routes: ''}, {title: '确认收货', routes: null}]},
    pendingPayment: {name: '待付款', color: 'red', operating: [{title: '取消订单', routes: ''}, {title: '去付款', routes: '/pay/sure'}]},
    completed: {name: '已完成', color: '#7FB56E', operating: [{title: '删除订单', routes: ''}, {title: '再下一单', routes: '/order'}]},
    canceled: {name: '已取消', color: '#A0A0A0', operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: '/order'}]},
    refundding: {name: '退款中', color: 'red', operating: [{title: '再次购买', routes: ''}, {title: '退款进度', routes: null}]},
    goodsReturning: {name: '退货中', color: 'red', operating: [{title: '再次购买', routes: ''}, {title: '退款进度', routes: null}]},

    pendingShipment: {name: '待发货', color: '#7FB56E', operating: []},
    pendingReview: {name: '待审核', color: 'red', operating: []},
    received: {name: '已收货', color: 'red', operating: []},
    refundReview: {name: '退款审核', color: 'red', operating: []},
    refundded: {name: '已退款', color: 'red', operating: []},
    goodsReturnReview: {name: '退货审核', color: 'red', operating: []},
    goodsReturned: {name: '已退货', color: 'red', operating: []},
  };
  // scroll
  @ViewChild(InfiniteLoaderComponent) il;
  mOrderLoaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };

  constructor(
    private globalSrv: GlobalService,
    private mOrderSrv: MineOrderService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.mOrderInit({currentPage: '1'});
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
  }
  // init
  public mOrderInit(param): void {
    this.mOrderList = null;
    this.mOrderSrv.getMineOrderList(param).subscribe(
      (val) => {
        console.log(val);
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
      console.log(this.mOrderList);
    });
  }
  // select status
  public mOrderStatusSelect (status): void {
    console.log(status);
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
  public mineOrderOperate(param, childItem): void {
    console.log(childItem);
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
      this.router.navigate([param.routes], {queryParams: {orderId: childItem.id}});
      return;
    }
    if (param.title === '重新购买') {
      this.router.navigate([param.routes], {queryParams: {orderId: childItem.id}});
      return;
    }
  }
}
