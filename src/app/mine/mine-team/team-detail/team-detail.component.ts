import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MaskComponent} from 'ngx-weui';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TeamDetailComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '团队收益明细',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '筛选',
      color: '#86B876'
    }
  };
  // mask
  @ViewChild('teamDetailMask') teamDetailMask: MaskComponent;
  constructor() { }

  ngOnInit() {
  }
}
