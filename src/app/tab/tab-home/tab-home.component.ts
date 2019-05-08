import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class TabHomeComponent implements OnInit, OnChanges {
  // base
  @Input() public tabHome: any = null;
  // scroll
  public infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  @ViewChild(InfiniteLoaderComponent) il;

  constructor() { }

  ngOnInit() {}
  public onLoadMore(comp: InfiniteLoaderComponent): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tabHome);
  }
}
