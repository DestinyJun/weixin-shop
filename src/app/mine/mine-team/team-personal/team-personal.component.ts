import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MineTeamService} from '../../../common/services/mine-team.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-mine-detail-personal',
  templateUrl: './team-personal.component.html',
  styleUrls: ['./team-personal.component.less']
})
export class TeamPersonalComponent implements OnInit {
  // new date
  public tPerNewDate = new Date();
  // header
  public headerOption: HeaderContent = {
    title: '成员明细',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // data
  public memberDetailList: any = null;
  public memberUserDetail: any = null;
  public memberUserEarning: any = null;
  public earningStatusList: any = {
    noEarning: ['没有收益', '#7F7F7F'],
    earning: ['入账中', '#F9C22B'],
    earned: ['入账完成', '#7FB66E'],
    earnFailed: ['入账失败', '#E82E38'],
  };
  constructor(
    private mineTeamSrv: MineTeamService,
    private routerInfoSrv: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routerInfoSrv.params.subscribe(
      (params: Params) => {
        this.teamPerInit({userId: params['id']});
      }
    );
  }
  public teamPerInit(param): void {
    this.mineTeamSrv.mineTeamGetMemberEarn(param).subscribe(
      (val) => {
        if (val.status === 200) {
          this.memberUserDetail = val;
          console.log(this.memberUserDetail);
          this.memberDetailList = this.teamPerSerialization(val.datas);
          return;
        }
        this.router.navigate(['/error'], {
          queryParams: {
            msg: `查询个人收益明细失败，错误码${val.status}`,
            url: null,
            btn: '请重试'
          }
        });
      }
    );
  }
  // team personal Serialization
  public teamPerSerialization(params): any {
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
}
