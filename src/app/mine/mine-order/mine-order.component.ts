import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';

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
  public orderList: any = [
    {name: '待付款', amount: 156},
    {name: '待收货', amount: 6},
    {name: '已完成', amount: 50},
    {name: '退货', amount: 6},
  ];
  // order list
  public goodsInfo = [
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（一锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 100.00, amount: 0},
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（二锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 200.00, amount: 0},
  ];
  // scroll
  @ViewChild(InfiniteLoaderComponent) il;
  infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  constructor() { }

  ngOnInit() {
  }

}
