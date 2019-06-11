import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {Router} from '@angular/router';
import {MineRankingService} from '../../common/services/mine-ranking.service';
import {forkJoin} from 'rxjs';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-mine-ranking',
  templateUrl: './mine-ranking.component.html',
  styleUrls: ['./mine-ranking.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class MineRankingComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '销售排行榜',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // base
  public mineRanking: any = null;
  public mineRankingThree: any = null;
  // scroll
  public infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  @ViewChild(InfiniteLoaderComponent) il;

  constructor(
    private router: Router,
    private mineRankingSrv: MineRankingService
  ) { }

  ngOnInit() {
    this.mineRankInit();
  }
  public mineRankInit(): void {
    forkJoin([this.mineRankingSrv.mineRankingTeamTop({})]).subscribe(
      (res) => {
        if (res) {
          this.mineRanking = res;
          this.mineRankingThree = (res[0].data.slice(1)).slice(0, 3);
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `获取数据失败，请检查网络后重试！`,
              url: null,
              btn: '请重试',
            }});
        }
      }
    );
  }
  public onLoadMore(comp: InfiniteLoaderComponent): void {}
}
