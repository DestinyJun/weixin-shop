import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ClientAddComponent implements OnInit {
  public inputRes: any = {
    name: ''
  };
  // header
  public headerOption: HeaderContent = {
    title: '新增客户收货地址',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '保存',
      color: '#86B876'
    }
  };
  constructor() { }

  ngOnInit() {
  }
  onSelect() {
    this.time = new Date().getTime();
    console.log(this.time);
  }
}
