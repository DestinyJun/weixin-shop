import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig, ToastComponent} from 'ngx-weui';
import {Router} from '@angular/router';
import {OrderService} from '../../common/services/order.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrderPlaceComponent implements OnInit {
  public orderPlaceAddress: any = null;
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
  public goodsInfo: any[];
  /*public goodsInfo = [
    {mainImage: 'assets/images/weui-img.png', title: '八宝五胆药墨（一锭）', info: '八宝五胆药墨简介', originalPrice: 100.00, amount: 0},
    {mainImage: 'assets/images/weui-img.png', title: '八宝五胆药墨（二锭）', info: '八宝五胆药墨简介', originalPrice: 200.00, amount: 0},
  ];*/
  constructor(
    private router: Router,
    private orderSrv: OrderService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.orderPlaceAddress = this.globalService.addressEvent;
    this.orderSrv.orderGetGoods({}).subscribe(
      (val) => {
        if (val.status === 200) {
          val.datas.map((item) => {
            item['amount'] = null;
          });
          this.goodsInfo = val.datas;
        }
      }
    );
  }
  public goodsTotalCount (event, i): void {
    console.log(event);
    this.totalPrice = 0;
    this.goodsInfo[i].amount = event;
    this.goodsInfo.map((item) => {
      this.totalPrice += item.originalPrice * item.amount;
    });
    console.log(this.totalPrice);
  }
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  public submitOrder() {
    this.onToastShow('success');
    this.router.navigate(['/pay']);
  }

}
