import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';

@Component({
  selector: 'app-team-bill',
  templateUrl: './team-bill.component.html',
  styleUrls: ['./team-bill.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TeamBillComponent implements OnInit {
// header
  public headerOption: HeaderContent = {
    title: '账单详情',
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
