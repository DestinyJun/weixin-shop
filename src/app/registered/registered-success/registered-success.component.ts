import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-registered-success',
  templateUrl: './registered-success.component.html',
  styleUrls: ['./registered-success.component.less']
})
export class RegisteredSuccessComponent implements OnInit {
  public user = '100101';
  public headerOption: HeaderContent = {
    title: '注册成功',
    leftContent: {
      icon: 'fa fa-times'
    },
    rightContent: {
      icon: 'fa fa-ellipsis-h'
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
