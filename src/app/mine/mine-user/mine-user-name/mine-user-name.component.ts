import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';

@Component({
  selector: 'app-mine-user-name',
  templateUrl: './mine-user-name.component.html',
  styleUrls: ['./mine-user-name.component.less']
})
export class MineUserNameComponent implements OnInit {
// header
  public headerOption: HeaderContent = {
    title: '更改名字',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '保存',
      icon: '',
      color: '#39A12D'
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
