import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-pay-way',
  templateUrl: './pay-way.component.html',
  styleUrls: ['./pay-way.component.less']
})
export class PayWayComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '选择支付方式',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      icon: ''
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
