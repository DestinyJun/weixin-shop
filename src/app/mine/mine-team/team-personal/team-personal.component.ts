import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MineTeamService} from '../../../common/services/mine-team.service';
import {ActivatedRoute, Params} from '@angular/router';

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
  // data
  public user: any = {userId: null};

  constructor(
    private mineTeamSrv: MineTeamService,
    private routerInfoSrv: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerInfoSrv.params.subscribe(
      (params: Params) => {
        this.user.userId = params['id'];
        this.mineTeamSrv.mineTeamGetMemberEarn(this.user).subscribe(
          (value) => {
            console.log(value);
          }
        );
      },
      error => console.log('没有获取参数'),
      () => {
        console.log('完成');
        this.mineTeamSrv.mineTeamGetMemberEarn({userId: this.user}).subscribe(
          (value) => {
            console.log(value);
          }
        );
      }
    );
  }

}
