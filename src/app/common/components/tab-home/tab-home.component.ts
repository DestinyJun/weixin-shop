import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {Router} from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }
  public onLoadMore(comp: InfiniteLoaderComponent): void {}
}
