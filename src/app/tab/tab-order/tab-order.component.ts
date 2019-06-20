import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig, ToastComponent} from 'ngx-weui';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../common/services/order.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-tab-order',
  templateUrl: './tab-order.component.html',
  styleUrls: ['./tab-order.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TabOrderComponent implements OnInit {
  // data
  public orderId: any = null;
  public orderAmount: any = 0;
  public orderPlaceAddressInfo: any = null;
  public orderPlaceInvoiceInfo: any = null;
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
    this.orderPlaceInitialize();
  }
  // get goods
  public orderPlaceInitialize (): void {
    this.orderSrv.orderGetGoods({}).subscribe(
      (val) => {
        if (val.status === 200) {
          val.datas.map((item, index) => {
            item['amount'] = parseInt(this.globalService.wxSessionGetObject('goods' + index), 10);
            if (item.amount) {
              this.orderPlaceInfo.goodsItem.push({
                goodsId: item.id,
                quantity: item.amount,
              });
            }
            this.totalPrice += item.discountPrice * item.amount;
            this.orderAmount +=  item.amount;
          });
          this.goodsInfo = val.datas;
        }
      }
    );
  }
 // goods count
  public goodsTotalCount(event, i): void {
    this.orderPlaceInfo.goodsItem = [];
    this.totalPrice = 0;
    this.orderAmount = 0;
    this.globalService.wxSessionSetObject(`goods${i}`, event);
    this.goodsInfo[i].amount = event;
    this.goodsInfo.map((item) => {
      if (item.amount) {
        this.orderPlaceInfo.goodsItem.push({
          goodsId: item.id,
          quantity: item.amount,
        });
      }
      this.orderAmount +=  item.amount;
      this.totalPrice += item.discountPrice * item.amount;
    });
  }
  // get Invoice
  public getInvoiceClick(): void {
    if (this.orderPlaceAddressInfo) {
      if (this.orderPlaceInvoiceInfo) {
        this.router.navigate(['/order/orinvoice'], {queryParams: {type: this.orderPlaceInvoiceInfo.invoiceType}});
      } else {
        this.router.navigate(['/order/orinvoice'], {queryParams: {type: 'noinvoice'}});
      }
      return;
    }
    this.onToastShow('success');
  }
  // order place
  public submitOrder() {
    if (!this.orderPlaceAddressInfo) {
      this.onToastShow('success');
      return;
    }
    this.orderSrv.orderPlace(this.orderPlaceInfo).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
        this.orderPlaceAddressInfo = null;
        this.orderPlaceInvoiceInfo = null;
          this.goodsInfo.map((item, index) => {
            this.globalService.wxSessionSetObject(`goods${index}`, 0);
          });
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

}
