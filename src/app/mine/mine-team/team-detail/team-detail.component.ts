import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MaskComponent, PickerService} from 'ngx-weui';
import {MineTeamService} from '../../../common/services/mine-team.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TeamDetailComponent implements OnInit, OnDestroy {
  // new date
  public tDetailNewDate = new Date();
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
  public filters: any = {};
  public filtersSearchList: any = null;
  public filtersName: any = '';
  public filterStatus: any[] = [
    {label: '全部', value: 'noEarning', actives: true},
    {label: '入账中', value: 'earning',  actives: false},
    {label: '已入账', value: 'earned',  actives: false},
    {label: '入账失效', value: 'earnFailed',  actives: false},
  ];
  public filtersTime: any = {
    startDate: '开始时间',
    endDate: '结束时间',
  };
  public filterMember: any[] = [];
  // earning list
  public earningList: any = null;
  public earningStatusList: any = {
    noEarning: ['没有收益', '#7F7F7F'],
    earning: ['入账中', '#F9C22B'],
    earned: ['入账完成', '#7FB66E'],
    earnFailed: ['入账失败', '#E82E38'],
  };
  // mask
  @ViewChild('teamDetailMask') teamDetailMask: MaskComponent;
  constructor(
    private mineTeamSrv: MineTeamService,
    private srv: PickerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.detailDataInit({}, 'init');
    this.mineTeamSrv.mineTeamGetMember({}).subscribe(
      (value) => {
        console.log(value);
        if (value.status === 200) {
          value.datas.unshift({nikeName: '全部', id: 0, actives: true});
          value.datas.map((param) => {
            if (param.nikeName !== '全部') {
              param.actives = false;
            }
          });
          this.filterMember = value.datas;
        }
      }
    );
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  public detailDataInit(param, type: 'init' | 'search') {
    this.mineTeamSrv.mineTeamGetEarn(param).subscribe(
      (value) => {
        console.log(value);
        if (value.status === 200) {
          if (type === 'init') {
            this.earningList = this.detailSerialization(value.datas);
          } else {
            this.filtersSearchList = this.detailSerialization(value.datas);
            console.log(this.filtersSearchList);
          }
        }
        if (value.status !== 200) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '页面加载错!',
              url: '/tab/home',
              btn: '返回首页'
            }
          });
        }
      }
    );
  }
  // filter status
  public detailFilterStatusClick (item): void {
    this.filters.earningStatus = item.value;
    this.filterStatus.map((val) => {
      val.actives = false;
    });
    item.actives = true;
    if (item.label === '全部') {
      if ('earningStatus' in this.filters) {
        delete this.filters.earningStatus;
      }
    }
  }
  // filter time
  public detailFilterTimeSelClick(type: string) {
    this.srv.showDateTime('date', '', new Date(), null, new Date()).subscribe((res: any) => {
      const timers = res.formatValue.split('-');
      if (type === 'start') {
        this.filtersTime.startDate = `${timers[0]}.${timers[1]}.${timers[2]}`;
        this.filters.startDate = `${timers[0]}.${timers[1]}.${timers[2]}`;
        return;
      }
      this.filtersTime.endDate = `${timers[0]}.${timers[1]}.${timers[2]}`;
      this.filters.endDate = `${timers[0]}.${timers[1]}.${timers[2]}`;
    });
  }
  // filter member
  public detailFilterMemberClick (item): void {
    this.filterMember.map((val) => {
      val.actives = false;
    });
    item.actives = true;
    this.filters.userId = item.id;
    this.filtersName = item.nikeName;
    if (item.nikeName === '全部') {
      if ('userId' in this.filters) {
        delete this.filters.userId;
      }
    }
  }
  // team detail Serialization
  public detailSerialization(params): any {
    const res = [];
    const a = [];
    const b = [];
    params.map((item) => {
      b.push(item.createdDate.slice(0, 10));
    });
    for (const s in b) {
      if (b) {
        if (a.indexOf(b[s]) < 0) {
          a.push(b[s]);
        }
      }
    }
    a.map((val) => {
      const c = [];
      params.map((pItem) => {
        if (pItem.createdDate.slice(0, 10) === val) {
          c.push(pItem);
        }
      });
      res.push({times: val, value: c });
    });
    return res;
  }
  // filter delete
  public detailDelFilterClick(item: string) {
    delete this.filters[item];
    this.detailDataInit(this.filters, 'search');
  }
  // filter reset
  public detailResetFilterClick (type: 'reset' | 'sure'): void {
    this.filterStatus.map((val, index) => {
      if (index === 0) {
        val.actives = true;
      } else {
        val.actives = false;
      }
    });
    this.filtersTime = {
      startDate: '开始时间',
      endDate: '结束时间',
    };
    this.filterMember.map((val, index) => {
      if (index === 0) {
        val.actives = true;
      } else {
        val.actives = false;
      }
    });
    if (type === 'sure') {
      this.detailDataInit(this.filters, 'search');
    }
  }
}
