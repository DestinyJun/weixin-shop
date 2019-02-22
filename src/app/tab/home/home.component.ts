import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {timer} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // scroll
  infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '48vh'
  };
  @ViewChild(InfiniteLoaderComponent) il;
  restartBtn = false;
  items: any[] = Array(20)
    .fill(0)
    .map((v: any, i: number) => i);
  // card
  public tradeStatistics = [
    {bgColor: '#FF6565', timeTag: '今天', amount: '7', money: '1,762.00', dateStart: '2018年12月25日', dateEnd: null},
    {bgColor: '#65D2FF', timeTag: '本月', amount: '23', money: '69,762.00', dateStart: '2018年1月1日', dateEnd: '2018年1月30日'},
    {bgColor: '#7E65FF', timeTag: '本年', amount: '219', money: '3111,762.00', dateStart: '2018年1月1日', dateEnd: '2018年10月25日'},
    ];
  constructor() { }

  ngOnInit() {
    if (this.tradeStatistics[0].dateEnd) {
      console.log('1');
    }
  }
  public onLoadMore(comp: InfiniteLoaderComponent): void {
    this.restartBtn = false;
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
    });
  }
  public restart(): void {
    this.items.length = 0;
    this.il.restart();
  }

}
