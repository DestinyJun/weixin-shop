import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MaskComponent, PickerService} from 'ngx-weui';
import {MineTeamService} from '../../../common/services/mine-team.service';

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
  // filter
  public filters: any = {
    userId: null,
    earningStatus: null,
    startDate: null,
    endDate: null,
  };
  public filterLabel: any = {
    userId: null,
    earningStatus: null,
    startDate: null,
    endDate: null,
  };
  public filterStatus: any[] = [
    {label: '全部', value: '1', actives: true},
    {label: '已入账', value: '2',  actives: false},
    {label: '入账中', value: '3',  actives: false},
    {label: '入账失效', value: '4',  actives: false},
  ];

  // mask
  @ViewChild('teamDetailMask') teamDetailMask: MaskComponent;
  constructor(
    private mineTeamSrv: MineTeamService,
    private srv: PickerService
  ) { }

  ngOnInit() {
    this.mineTeamSrv.mineTeamGetEarn({}).subscribe(
      (value) => {
        console.log(value);
      }
    );
    this.mineTeamSrv.mineTeamGetMember({}).subscribe(
      (value) => {
        console.log(value);
      }
    );
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
  public detailDelFilterClick(item: string) {
    console.log(item);
    this.filterLabel.item = '';
    this.filters.item = '';
    console.log(this.filters, this.filterLabel);
  }
  public detailFilterStatusClick (item): void {
    this.filters.earningStatus = item.value;
    this.filterLabel.userId = item.label;
    console.log(this.filters);
    this.filterStatus.map((val) => {
      val.actives = false;
    });
    item.actives = true;
  }
}
