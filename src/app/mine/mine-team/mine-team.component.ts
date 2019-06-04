import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig, PickerOptions, PickerService} from 'ngx-weui';
import {Router} from '@angular/router';
import {MineTeamService} from '../../common/services/mine-team.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-mine-team',
  templateUrl: './mine-team.component.html',
  styleUrls: ['./mine-team.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineTeamComponent implements OnInit, OnDestroy {
  // header
  public headerOption: HeaderContent = {
    title: '我的团队',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '收益明细',
      color: '#88BCF4'
    }
  };
  // scroll
  public infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '80%'
  };
  public maxData: number;
  public mineTeamDate: any = null;
  // date picker
  public res: any = {
    city: '310105',
    date: new Date()
  };
  public year: string[];
  public pickerOptions: PickerOptions = {
    cancel: '取消',
    confirm: '确认'
  };
  public listLoading = false;
  public yearMonthPicker: any = {
    min: new Date(2015, 0, 1),
    max: new Date()
  };
  public yearMonthPickerTime: any = null;
  public yearPickerTime: any = null;
  constructor(
    private srv: PickerService,
    private router: Router,
    private mineTeamSrv: MineTeamService,
    private dateSrv: DatePipe
  ) {}

  ngOnInit() {
    this.timer();
    this.yearMonthPickerTime = this.dateSrv.transform(new Date(), 'yyyy-MM');
    this.yearPickerTime = this.dateSrv.transform(new Date(), 'yyyy');
    this.mineTeamGetData(this.dateSrv.transform(new Date(), 'yyyy-MM'));
  }
  // year
  public timer() {
    this.year = [];
    const date = new Date;
    for (let i = 0; i < 5; i++) {
      // this.year.push(date.getFullYear() - i + '年');
      this.year.push((date.getFullYear() - i).toString());
    }
    // this.year = this.year.reverse();
  }
  // team data
  public mineTeamGetData(time: string) {
    // this.mineTeamDate = null;
    this.mineTeamSrv.mineTeamGetDate({date: time}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.listLoading = false;
          this.mineTeamDate = val.data;
          if (val.data.team.length !== 0) {
            this.maxData = val.data.team[val.data.team.length - 1].sum_amount_paid;
            this.mineTeamDate.team.map((prop, index) => {
              if (this.maxData) {
                prop.width = (((prop.sum_amount_paid * 100) / this.maxData).toFixed(1));
              } else {
                prop.width = '0';
              }
            });
          }
          console.log(this.mineTeamDate);
        } else {
          this.listLoading = false;
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `服务器处理失败，错误代码：${val.status}！`,
              url: null,
              btn: '请重试'
            }
          });
        }
      }
    );
  }
  // tab
  public onSelect(event) {
     if (event.heading === '月度') {
       this.mineTeamGetData(this.dateSrv.transform(new Date(), 'yyyy-MM'));
       return;
     }
    this.mineTeamGetData(this.dateSrv.transform(new Date(), 'yyyy'));
  }
  // scroll
  public onLoadMore(comp: InfiniteLoaderComponent) {
    comp.setFinished();
  }
  // select
  public selectMonthClick() {
    /*this.srv.showDateTime('date-ym', '', null, null, new Date()).subscribe((res: any) => {});*/
    this.listLoading = true;
    this.mineTeamGetData(this.yearMonthPickerTime);
  }
  public selectYearClick() {
   /* this.srv.show(this.year, null, [this.year.length - 1], this.pickerOptions).subscribe((res: any) => {});*/
    this.listLoading = true;
    this.mineTeamGetData(this.yearPickerTime.slice(0, 4));
  }
  // header
  public mineTeamInClient() {
    this.router.navigate(['/mine/team/detail']);
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
}
