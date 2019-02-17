import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-order-client',
  templateUrl: './order-client.component.html',
  styleUrls: ['./order-client.component.less']
})
export class OrderClientComponent implements OnInit {
// header
  public headerOption: HeaderContent = {
    title: '选择客户收货地址',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '新增',
      color: '#86B876'
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
