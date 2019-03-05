import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-mine-shared',
  templateUrl: './mine-shared.component.html',
  styleUrls: ['./mine-shared.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineSharedComponent implements OnInit {
// header
  public headerOption: HeaderContent = {
    title: '邀请你加入团队',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '换个样式',
      color: '#86B876'
    }
  };
  constructor() { }

  ngOnInit() {
  }
  public sharegHeaderRightClick() {}
}
