import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class TabHomeComponent implements OnInit {
  // base
  @Input() public tabHome: any = null;
  // scroll
  public infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  @ViewChild(InfiniteLoaderComponent) il;

  constructor() { }

  ngOnInit() {}
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
    this.il.restart();
  }

}
