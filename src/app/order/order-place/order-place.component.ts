import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig, ToastComponent} from 'ngx-weui';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrderService} from '../../common/services/order.service';
import {GlobalService} from '../../common/services/global.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrderPlaceComponent implements OnInit, OnDestroy {
  // data
  public orderStatus = true;
  public orderAmount: any = 0;
  public orderId: any = null;
  public orderPlaceAddressInfo: any = null;
  public orderPlaceInvoiceInfo: any = {};
  public orderPlaceInfo: any = {
    addressId: '',
    goodsItem: [],
    remark: ''
  };
  // toast
  @ViewChild('success') successToast: ToastComponent;
  // scroll
  infiniteloaderConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  @ViewChild(InfiniteLoaderComponent) il;
  // header
  public headerOption: HeaderContent = {
    title: '商品预约',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  // goodsinfo
  public totalPrice = 0;
  public goodsInfo: any = null;
  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
    private orderSrv: OrderService,
    private globalService: GlobalService
  ) {
  }

  ngOnInit() {
    this.orderPlaceAddressInfo = this.globalService.addressEvent;
    this.orderPlaceInvoiceInfo = this.globalService.invoiceEvent;
    if (this.orderPlaceAddressInfo) {
      this.orderPlaceInfo.addressId = this.orderPlaceAddressInfo.id;
    }
    if (this.orderPlaceInvoiceInfo) {
      this.orderPlaceInfo.invoiceId = this.orderPlaceInvoiceInfo.id;
    }
    this.routeInfo.queryParams.subscribe(
      (val) => {
        this.orderPlaceInitialize(val);
      }
    );
    document.body.addEventListener('focusin', () => {
      if (this.orderStatus) {
        timer(80).subscribe(
          (val) => {
            window.scroll(0, 0);
          }
        );
      }
    });
    document.body.addEventListener('focusout', () => {
      if (this.orderStatus) {
        timer(80).subscribe(
          (val) => {
            window.scroll(0, 0);
          }
        );
      }
    });
  }
  // get goods
  public orderPlaceInitialize (param): void {
    this.orderSrv.orderGetGoodItem(param).subscribe(
      (val) => {
        if (val.status === 200) {
          /* val.datas.map((item, index) => {
           item['amount'] = parseInt(this.globalService.wxSessionGetObject('goods' + index), 10);
           if (item.amount) {
             this.orderPlaceInfo.goodsItem.push({
               goodsId: item.id,
               quantity: item.amount,
             });
           }
           this.totalPrice += item.originalPrice * item.amount;
         });*/
          val.data['amount'] = parseInt(this.globalService.wxSessionGetObject('good'), 10);
          if (val.data.amount) {
            this.orderPlaceInfo.goodsItem.push({
              goodsId: val.data.id,
              quantity: val.data.amount,
            });
            this.orderAmount =  val.data.amount;
            this.totalPrice += val.data.discountPrice * val.data.amount;
          }
          this.goodsInfo = val.data;
          return;
        }
        this.router.navigate(['/error'], {queryParams: {
            msg: `获取产品失败，错误代码${val.status}`,
            url: null,
            btn: '请重试'
          }});
      }
    );
  }
 // goods count
  public goodsTotalCount(event, i): void {
    this.orderPlaceInfo.goodsItem = [];
    this.totalPrice = 0;
    this.orderAmount = 0;
    this.globalService.wxSessionSetObject(`good`, event);
    this.goodsInfo.amount = event;
    if (this.goodsInfo.amount) {
      this.orderPlaceInfo.goodsItem.push({
        goodsId: this.goodsInfo.id,
        quantity: this.goodsInfo.amount,
      });
      this.orderAmount =  this.goodsInfo.amount;
      this.totalPrice += this.goodsInfo.discountPrice * this.goodsInfo.amount;
    }
  }
  // get Invoice
  public getInvoiceClick(): void {
    if (this.orderPlaceInvoiceInfo) {
      this.router.navigate(['/order/orinvoice'], {queryParams: {type: this.orderPlaceInvoiceInfo.invoiceType}});
    } else {
      this.router.navigate(['/order/orinvoice'], {queryParams: {type: 'noinvoice'}});
    }
  }
  // order place
  public submitOrder() {
    if (!this.orderPlaceAddressInfo) {
      this.onToastShow('success');
      return;
    }
    this.orderSrv.orderPlace(this.orderPlaceInfo).subscribe(
      (val) => {
        if (val.status === 200) {
          this.orderPlaceAddressInfo = null;
          this.orderPlaceInvoiceInfo = null;
          this.globalService.wxSessionSetObject(`good`, event);
          this.router.navigate(['/order/sure', val.data.id]);
          return;
        }
        this.router.navigate(['/error'], {queryParams: {
          msg: `下单失败，错误代码${val.status}`,
          url: null,
          btn: '请重试'
          }});
      }
    );
  }
  // toast
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  ngOnDestroy(): void {
    this.orderStatus = false;
  }
}
