import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderService} from '../../common/services/order.service';
import {GlobalService} from '../../common/services/global.service';

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
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '保存',
      color: '#6AABF1'
    }
  };
  // radio
  public orderAddRadioRes: any = {
    invoiceType: 'noinvoice',
    title: null,
    number: null,
  };
  // bill list
  public orderBill: Observable<any>;
  // data
  public orderClientId: any = null;
  constructor(
    private orderSrv: OrderService,
    private globalSrv: GlobalService,
    private routeInfo: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.orderClientId = params['id'];
      this.orderInvocInitialize(params['id']);
    });
  }
  // Initialize
  public orderInvocInitialize (id): void {
    this.orderBill = this.orderSrv.orderGetInvoice({contactsId: id});
  }
  // radio change
  public radioResChanges() {
    if (this.orderAddRadioRes.invoiceType !== 'noinvoice') {
      this.headerOption.rightContent.color = '#86B876';
    } else {
      this.headerOption.rightContent.color = '#8C8C8C';
      window.history.back();
    }
  }
  // add click
  public orderAddBillClick (): void {
    if (this.orderAddRadioRes.invoiceType !== 'noinvoice') {
      this.orderAddRadioRes.contactsId = this.orderClientId;
      this.orderSrv.orderAddInvoice(this.orderAddRadioRes).subscribe(
        (val) => {
          if (val.status === 200) {
            this.orderAddRadioRes = {
              invoiceType: 'individual',
              title: null,
              number: null,
            };
            this.orderInvocInitialize(this.orderClientId);
          }
        }
      );
    }
  }
  // bill click
  public orderBillClick (item): void {
    this.globalSrv.invoiceEvent = item;
    window.history.back();
  }
}
