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
    this.globalSrv.remindEvent.next({msg: '加载中...', status: false});
    this.mOrderSrv.getMineOrderList({currentPage: '1'}).subscribe(
      (val) => {
        if (val.status === 200 ) {
          this.globalSrv.remindEvent.next({msg: '加载完毕...', status: true});
          // this.mOrderList = val.datas;
          console.log(val);
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
  }
}
