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
  // data
  public orderPlaceAddressInfo: any = null;
  public orderPlaceInvoiceInfo: any = null;
  public orderPlaceInfo: any = {
    addressId: '',
    invoiceId: '',
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
  public goodsInfo: any = null;
  constructor(
    private router: Router,
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
            item['amount'] = parseInt(this.globalService.orderPlaceGetObject('goods' + index), 10);
            if (item.amount) {
              this.orderPlaceInfo.goodsItem.push({
                goodsId: item.id,
                quantity: item.amount,
              });
            }
            this.totalPrice += item.originalPrice * item.amount;
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
    this.globalService.orderPlaceSetObject(`goods${i}`, event);
    this.goodsInfo[i].amount = event;
    this.goodsInfo.map((item) => {
      if (item.amount) {
        this.orderPlaceInfo.goodsItem.push({
          goodsId: item.id,
          quantity: item.amount,
        });
      }
      this.totalPrice += item.originalPrice * item.amount;
    });
  }

  // get Invoice
  public getInvoiceClick(): void {
    if (this.orderPlaceAddressInfo) {
      this.router.navigate(['/order/orinvoice', this.orderPlaceAddressInfo.parentId]);
      return;
    }
    this.onToastShow('success');
  }

  // order place
  public submitOrder() {
    this.orderSrv.orderPlace(this.orderPlaceInfo).subscribe(
      (val) => {
        if (val.status === 200) {
          this.globalService.orderPlaceDel();
          this.router.navigate(['/order/sure', val.data.id]);
        }
      }
    );
  }

  // toast
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }

}
