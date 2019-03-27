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
  public paySucOrdId: any;
  // header
  public headerOption: HeaderContent = {
    title: '支付完成',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {}
  };
  constructor(
    private router: Router,
    private routerInfo: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe((params: Params) => {
      this.paySucOrdId = params;
    });
  }

}
