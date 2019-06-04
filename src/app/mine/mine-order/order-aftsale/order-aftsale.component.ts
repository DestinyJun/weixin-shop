import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {InfiniteLoaderConfig} from 'ngx-weui';
import {Observable} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-aftsale',
  templateUrl: './order-aftsale.component.html',
  styleUrls: ['./order-aftsale.component.less']
})
export class OrderAftsaleComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '选择服务类型',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // scroll
  ordAftScrollConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  // details
  public detailsData: any = null;
  constructor(
    private mOrderSrv: MineOrderService,
    private routerInfo: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.routerInfo.params.subscribe(params => this.mineOrdDetailInit(params.id));
  }
  public mineOrdDetailInit (id): void {
   this.mOrderSrv.mineOrdGetDetail({orderId: id}).subscribe(
     (val) => {
       if (val.status === 200) {
         this.detailsData = val;
         return;
       }
       this.router.navigate(['/error'], {
         queryParams: {
           msg: '获取订单详情失败，错误代码',
           url: null,
           btn: '请重试'
         }
       });
     }
   );
  }
}
