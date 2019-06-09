import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../common/services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab-product',
  templateUrl: './tab-product.component.html',
  styleUrls: ['./tab-product.component.less']
})
export class TabProductComponent implements OnInit {
  public tabProdList: any = null;
  constructor(
    private orderSrv: OrderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tabProdInit();
  }
  // get goods
  public tabProdInit (): void {
    this.orderSrv.orderGetGoods({}).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          this.tabProdList = val.datas;
        } else {
          this.router.navigate(['/error'], {queryParams: {
              msg: `获取信息失败，错误码${val.status}`,
              url: null,
              btn: '请重试'
            }});
        }
      }
    );
  }
}
