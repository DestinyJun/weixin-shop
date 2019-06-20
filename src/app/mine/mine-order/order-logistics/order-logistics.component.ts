import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../../common/services/global.service';

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
  public orderLogMsg: any = [
    {msg: '打包完成', createDate: '2019年1月12日21:09'},
    {msg: '您的包裹已出库，包裹数：1', createDate: '2019年1月12日21:09'},
    {msg: '货物已交付申通快递', createDate: '2019年1月12日21:09'},
    {msg: '货物已完成分拣，离开【广东黄埔分拣中心】', createDate: '2019年1月12日21:09'},
    {msg: '货物已完成分拣，离开【贵阳亚一分拣中心】', createDate: '2019年1月12日21:09'},
    {msg: '货物分配，等待配送', createDate: '2019年1月12日21:09'},
  ];
  public orderLogProduct: any = null;
  constructor(
    private mOrderSrv: MineOrderService,
    private router: Router,
    private globalSrv: GlobalService,
    public routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(
      (param) => {
        console.log(param);
      }
    );
    console.log(JSON.parse(this.globalSrv.wxSessionGetObject('sms')));
    this.mineOrdDetailInit(217);
  }
  public mineOrdDetailInit (id): void {
    this.mOrderSrv.mineOrdGetDetail({orderId: id}).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          this.orderLogProduct = val.data;
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
}
