import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.less']
})
export class PaySuccessComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '支付完成',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {}
  };
  constructor() { }

  ngOnInit() {
  }

}
