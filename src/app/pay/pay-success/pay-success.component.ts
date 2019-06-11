import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.less']
})
export class PaySuccessComponent implements OnInit {
  // order id
  public paySucOrdSn: any;
  public paySucUrl: any = null;
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
  ) { }

  ngOnInit() {
    // 防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
    this.routerInfo.queryParams.subscribe((params: Params) => {
      this.paySucOrdSn = params;
    });
  }
  public payWayClick(): void {
    window.location.href = 'http://www.sjcqdjk.com/moyaoView/tab/home';
  }
}
