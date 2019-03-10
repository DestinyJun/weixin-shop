import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '订单详情',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // details list
  public detailsData: any = {
    'addressModel': {
      'address': '贵州省贵阳市观山湖区金融城MAX',
      'createdDate': 1550204337000,
      'id': 1,
      'lastModifiedDate': 1550215494000,
      'name': '王明',
      'phone': '18745787842'
    },
    'amount': 2.000000,
    'amountPaid': 0.000,
    'createdDate': 1550729921000,
    'id': 1,
    'invoiceModel': {
      'createdDate': 1550214198000,
      'id': 1,
      'invoiceType': 'company',
      'lastModifiedDate': 1550215556000,
      'number': '0987654321',
      'title': 'title'
    },
    'lastModifiedDate': 1550729921000,
    'price': 2.000000,
    'sn': '2019',
    'status': 'pendingPayment'
  };
  // order list
  public goodsInfo = [
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（一锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 100.00, amount: 0},
    {imgURL: 'assets/images/weui-img.png', goodsName: '八宝五胆药墨（二锭）', goodsDesc: '八宝五胆药墨简介', goodsPrice: 200.00, amount: 0},
  ];
  public payStatus = 1;


  constructor() {
  }

  ngOnInit() {
  }

}
