import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderConfig} from 'ngx-weui';
import {OrderService} from '../../common/services/order.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-sure',
  templateUrl: './order-sure.component.html',
  styleUrls: ['./order-sure.component.less']
})
export class OrderSureComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '确认订单',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  // data
  public orderDetail: any = null;
  public orderParentId: any = null;
  public totalPrice: any = null;
  // scroll
  infiniteloaderConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  constructor(
    private orderSrv: OrderService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routerInfo.params.subscribe(params => {
      this.orderParentId = params['parentId'];
      this.orderSureInit(params.id);
    });
  }
  public orderSureInit (id): void {
    this.orderSrv.orderGetDetail({orderId: id}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.orderDetail  = val;
          val.data.moyaoOrderItemModels.map((item) => {
            console.log(item);
            this.totalPrice += item.goods.discountPrice * item.quantity;
          });
          return;
        }
        this.router.navigate(['/error'], {
          queryParams: {
            msg: `获取数据失败，错误码${val.status}`,
            url: null,
            btn: '请重试'
          }
        });
      }
    );
  }
  // order sure
  public orderSureClick(id) {
    this.router.navigate(['/pay/sure'], {queryParams: {orderId: id}});
  }
}
