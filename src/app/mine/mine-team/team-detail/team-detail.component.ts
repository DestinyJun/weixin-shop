import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MaskComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TeamDetailComponent implements OnInit, OnDestroy {
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
  constructor(
    private srv: PickerService
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  public detailTimeSelClick(type: string) {
    this.srv.showDateTime('date', '', new Date(), null, new Date()).subscribe((res: any) => {
      if (type === 'start') {
        console.log('开始时间', res);
        return;
      }
      console.log('结束时间', res);
    });
  }
}
