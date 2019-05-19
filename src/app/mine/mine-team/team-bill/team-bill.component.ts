import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MineTeamService} from '../../../common/services/mine-team.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
  // data
  public teamBillDetail: any = null;
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
        this.teamBillInit({orderId: params['id']});
      }
    );
  }
  public teamBillInit(param): void {
    this.mineTeamSrv.mineTeamGetDetail(param).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          this.teamBillDetail = val.data;
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
}
