import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-client',
  templateUrl: './order-client.component.html',
  styleUrls: ['./order-client.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrderClientComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '选择客户收货地址',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '新增',
      color: '#86B876'
    }
  };
  // search
  items: Observable<string[]>;
  value: string;
  constructor() { }

  ngOnInit() {
  }
  public onBarSearch(term: string) {
    this.value = term;
    // if (term) this.items = this.tbService.search(term);
  }
  public onBarCancel() {
    console.log('onCancel');
  }

  public onBarClear() {
    console.log('onCancel');
  }

  public onBarSubmit(value: string) {
    console.log('onSubmit', value);
  }
}
