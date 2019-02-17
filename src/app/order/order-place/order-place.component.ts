import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig, ToastComponent} from 'ngx-weui';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrderPlaceComponent implements OnInit {
  // toast
  @ViewChild('success') successToast: ToastComponent;
  // scroll
  infiniteloaderConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  @ViewChild(InfiniteLoaderComponent) il;
  // header
  public headerOption: HeaderContent = {
    title: '下单',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      icon: ''
    }
  };
  // goodsinfo
  public totalPrice = 0;
  public goodsInfo = [
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（一锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: '100.00', amount: 0},
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（二锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: '200.00', amount: 0},
  ];
  constructor() { }

  ngOnInit() {}
  public goodsTotalCount (event, i): void {
    this.totalPrice = 0;
    this.goodsInfo[i].amount = event;
    this.goodsInfo.map((item) => {
      this.totalPrice += item.goodsPrice * item.amount;
    });
  }
  public  onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }

}
