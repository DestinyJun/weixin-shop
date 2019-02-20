import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderInvoiceComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '发票信息',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '提交',
      color: '#86B876'
    }
  };
  // radio
  radioRes: any = {
    radio: 'noinvoice',
    txt: '',
    txtNum: '',
    hisRadio: ''
  };
  constructor() { }

  ngOnInit() {
  }
  public radioResChanges() {
    if (this.radioRes.radio === 'noinvoice') {
      this.radioRes.hisRadio = '';
    }
    console.log(this.radioRes);
  }
}
