import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';

@Component({
  selector: 'app-mine-detail-personal',
  templateUrl: './team-personal.component.html',
  styleUrls: ['./team-personal.component.less']
})
export class TeamPersonalComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '成员明细',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
