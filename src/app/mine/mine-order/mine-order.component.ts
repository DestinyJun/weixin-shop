import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {MineOrderService} from '../../common/services/mine-order.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-mine-order',
  templateUrl: './mine-order.component.html',
  styleUrls: ['./mine-order.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineOrderComponent implements OnInit {
  // new date
  public newDate = new Date();
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
    {name: '待付款', amount: 156},
    {name: '待收货', amount: 6},
    {name: '已完成', amount: 50},
    {name: '退货', amount: 6},
  ];
  // order list
  public mOrderList: any[] = [
    /*{imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（一锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 100.00, amount: 0},
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（二锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 200.00, amount: 0},*/
  ];
  // order status
  public orderStates: any = {
    shippe: {name: '待收货', color: '#7FB56E', operating: [{title: '查看物流', routes: ''}, {title: '确认收货', routes: ''}]},
    pendingShipment: {name: '待发货', color: '#7FB56E', operating: [{title: '查看物流', routes: ''}, {title: '确认收货', routes: ''}]},
    pendingReview: {name: '待审核', color: 'red', operating: []},
    pendingPayment: {name: '未付款', color: 'red', operating: [{title: '取消订单', routes: ''}, {title: '去付款', routes: '/pay/sure'}]},
    received: {name: '已收货', color: 'red', operating: []},
    completed: {name: '已完成', color: '#7FB56E', operating: [{title: '删除订单', routes: ''}, {title: '再下一单', routes: ''}]},
    canceled: {name: '已取消', color: '#A0A0A0', operating: [{title: '删除订单', routes: ''}, {title: '重新购买', routes: ''}]},
    refundReview: {name: '退款审核', color: 'red', operating: []},
    refundding: {name: '退款中', color: 'red', operating: [{title: '再次购买', routes: ''}, {title: '退款进度', routes: ''}]},
    refundded: {name: '已退款', color: 'red', operating: []},
    goodsReturnReview: {name: '退货审核', color: 'red', operating: []},
    goodsReturning: {name: '退货中', color: 'red', operating: ['再次购买', '退货进度']},
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
  ) {
  }

  ngOnInit() {
    this.mOrderInit();
  }

  public mOrderInit(): void {
    this.mOrderSrv.getMineOrderList({currentPage: '1'}).subscribe(
      (val) => {
        if (val.status === 200 ) {
          this.orderSerialization(val.datas);
        }
      }
    );
  }
  // scroll
  public mineOrderLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
  // client Serialization
  public orderSerialization(params): void {
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
    console.log(this.mOrderList);
  }
}
