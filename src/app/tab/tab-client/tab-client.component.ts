import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab-client',
  templateUrl: './tab-client.component.html',
  styleUrls: ['./tab-client.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TabClientComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '客户',
    leftContent: {
      icon: ''
    },
    rightContent: {
      title: '新增',
      color: '#86B876'
    }
  };
  // client
  public clientList = [
    {
      className: '最近7天交易客户',
      value: [
        {name: '王大锤', phone: 13888888888, address: '贵阳市南明区花果园', editState: false},
        {name: '王大锤', phone: 13888888888, address: '贵阳市南明区花果园', editState: false}
      ]
    },
    {
      className: 'A',
      value: [
        {name: '王大锤', phone: 13888888888, address: '贵阳市南明区花果园', editState: false},
        {name: '王大锤', phone: 13888888888, address: '贵阳市南明区花果园', editState: false}
      ]
    },
  ];
  // search
  public searchItems: Observable<string[]>;
  public value: string;
  // scroll
  @ViewChild(InfiniteLoaderComponent) il;
  public restartBtn = false;
  public infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  public items: any[] = Array(20)
    .fill(0)
    .map((v: any, i: number) => i);
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
  public onBarSearch(term: string) {
    this.value = term;
    // if (term) this.items = this.tbService.search(term);
  }
  public onBarCancel(): void {
    console.log('onCancel');
  }
  public onBarClear(): void {
    console.log('onCancel');
  }
  public onBarSubmit(value: string): void {
    console.log('onSubmit', value);
  }
  public onHeaderRightClick(): void {
    this.router.navigate(['/client/add']);
}

}
