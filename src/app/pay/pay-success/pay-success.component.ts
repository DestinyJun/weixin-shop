import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.less']
})
export class PaySuccessComponent implements OnInit {
  // order id
  public paySucOrdSn: any;
  // header
  public headerOption: HeaderContent = {
    title: '支付完成',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {}
  };
  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    // 防止页面后退
    // window.history.pushState(null, null, document.URL);
   /* window.addEventListener('popstate', function () {
      window.history.pushState(null, null, document.URL);
    });*/
    this.routerInfo.queryParams.subscribe((params: Params) => {
      this.paySucOrdSn = params;
    });
  }
  public payWayClick(): void {
    window.location.href = 'http://www.sjcqdjk.com/moyaoView/tab/home';
   /* this.location.subscribe(
      (val) => {
        console.log(val);
        if (val.url.indexOf('/pay/success') > 0) {
          this.location.forward();
        }
      }
    );*/
  }
}
