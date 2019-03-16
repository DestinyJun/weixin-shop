import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {timer} from 'rxjs';
import {TabService} from '../../common/services/tab.service';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class TabHomeComponent implements OnInit {
  // scroll
  public infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  @ViewChild(InfiniteLoaderComponent) il;
  // base
  restartBtn = false;
  /*public  items: any[] = Array(20)
    .fill(0)
    .map((v: any, i: number) => i);*/
  public tradeStatistics: any;
  public teamTop: any = [];

  constructor(
    private tabSrc: TabService
  ) { }

  ngOnInit() {
    this.tabSrc.tabGetPersonIncome({}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.tradeStatistics = val['dataObject'];
          console.log(this.tradeStatistics);
        }
      }
    );
    this.tabSrc.tabGetTeamTop({}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.teamTop = val.data;
        }
      }
    );
  }
  public onLoadMore(comp: InfiniteLoaderComponent): void {
    /*this.restartBtn = false;
    timer(1500).subscribe(() => {
      this.items.push(
        ...Array(10)
          .fill(this.items.length)
          .map((v, i) => v + i),
      );

      if (this.items.length >= 50) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });*/
  }
  public restart(): void {
    // this.items.length = 0;
    this.il.restart();
  }

}
