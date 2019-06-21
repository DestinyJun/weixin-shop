import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../common/services/global.service';
import {mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-order-logistics',
  templateUrl: './order-logistics.component.html',
  styleUrls: ['./order-logistics.component.less']
})
export class OrderLogisticsComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '物流信息',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // data
  public orderLogMsg: any = null;
  public orderLogProduct: any = null;
  public orderLogPrice: any = null;
  constructor(
    private mOrderSrv: MineOrderService,
    private router: Router,
    private globalSrv: GlobalService,
    public routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.globalSrv.wxSessionGetObject('sms')) {
      this.orderLogMsg = JSON.parse(this.globalSrv.wxSessionGetObject('sms'));
    }
    this.routerInfo.queryParams.subscribe(
      (param) => {
        console.log(param);
        this.mineOrdDetailInit(217);
      }
    );
  }
  public mineOrdDetailInit (id): void {
    this.mOrderSrv.mineOrdGetDetail({orderId: id}).pipe(
      mergeMap((val) => {
        if (val.status === 200) {
          this.orderLogProduct = val.data;
          val.data.moyaoOrderItemModels.map((item) => {
            this.orderLogPrice += item.goods.discountPrice * item.quantity;
          });
          if (this.globalSrv.wxSessionGetObject('sms')) {
            return EMPTY;
          }
          return this.mOrderSrv.mineOrdGetSms({code: val.data.pushExpressNum, type: val.data.pushExpressCompany});
        }
        this.router.navigate(['/error'], {
          queryParams: {
            msg: `获取订单详情失败，错误码${val.status}`,
            url: null,
            btn: '请重试'
          }
        });
      })
    )
      .subscribe(
        (val) => {
          if (val.status === 200) {
            this.globalSrv.wxSessionSetObject('sms', val.dataObject);
            return;
          }
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `获取物流数据失败，错误码${val.status}`,
              url: null,
              btn: '请重试'
            }
          });
        }
      );
  }
}
