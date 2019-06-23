import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderService} from '../../common/services/order.service';
import {GlobalService} from '../../common/services/global.service';
import {DialogComponent, DialogConfig, SkinType, ToastComponent, ToastService} from 'ngx-weui';
import {is_object} from '../../common/tools/is_object';

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
  // toast
  @ViewChild('addRemindToast') addRemindToast: ToastComponent;
  @ViewChild('addClientToast') addClientToast: ToastComponent;
  public clientMsg: string;
  // Dialog
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  public configDialog: DialogConfig = {};
  // bill list
  public orderBill: Observable<any>;
  // data
  public invoiceDataUpdate: any = {
    id: null,
    invoiceType: null,
    title: null,
    number: null,
  };
  public invoiceMaskShow = false;
  public invoiceMediator: any = {
    id: null,
    invoiceType: null,
    title: null,
    number: null,
  };
  public invoiceTimer: any;
  constructor(
    private orderSrv: OrderService,
    private globalSrv: GlobalService,
    private routeInfo: ActivatedRoute,
    private srv: ToastService,
  ) {}

  ngOnInit() {
    this.routeInfo.queryParams.subscribe((params: Params) => {
      this.orderAddRadioRes.invoiceType = params.type;
      this.orderInvocInitialize();
    });
  }
  // Initialize
  public orderInvocInitialize (): void {
    this.orderBill = this.orderSrv.orderGetInvoice({});
  }
  // add click
  public orderInvocAddClick (): void {
    if (this.orderAddRadioRes.invoiceType !== 'noinvoice') {
      if (this.orderAddRadioRes.invoiceType === 'individual' && this.orderAddRadioRes.title) {
        this.orderSrv.orderAddInvoice(this.orderAddRadioRes).subscribe(
          (val) => {
            if (val.status === 200) {
              this.orderAddRadioRes = {
                invoiceType: 'individual',
                title: null,
                number: null,
              };
              this.orderInvocInitialize();
            }
          }
        );
      }
      if (this.orderAddRadioRes.invoiceType === 'company' && this.orderAddRadioRes.title  && this.orderAddRadioRes.number) {
        this.orderSrv.orderAddInvoice(this.orderAddRadioRes).subscribe(
          (val) => {
            if (val.status === 200) {
              this.orderAddRadioRes = {
                invoiceType: 'individual',
                title: null,
                number: null,
              };
              this.orderInvocInitialize();
            }
          }
        );
      }
    }
  }
  // radio change
  public orderInvocRadioChanges() {
    if (this.orderAddRadioRes.invoiceType === 'noinvoice') {
      this.globalSrv.invoiceEvent = null;
      window.history.back();
    }
  }
  // bill click
  public orderBillClick (event, item): void {
    event.stopPropagation();
    this.globalSrv.invoiceEvent = item;
    window.history.back();
  }
  // remind + del
  public dialogDelShow(event, type: SkinType, msg: string, item: any) {
    event.stopPropagation();
    this.configDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      confirm: '是',
      cancel: '否',
      content: msg
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Dialog`]).show().subscribe((res: any) => {
        if (res.value) {
          this.srv.loading('删除中...');
          this.orderSrv.orderDelInvoice({id: item.id}).subscribe(
            (val) => {
              this.srv.hide();
              this.clientMsg = val.message;
              this.onShow('addClient');
              this.orderInvocInitialize();
            }
          );
        }
      });
    }, 10);
    return false;
  }
  // dialog
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
  // TouchStart touchend
  public orderBillTouchStart(event, item): void {
    if (event) {
      this.invoiceMediator.id = item.id;
      this.invoiceMediator.title = item.title;
      this.invoiceMediator.invoiceType = item.invoiceType;
      this.invoiceDataUpdate.id = item.id;
      this.invoiceDataUpdate.title = item.title;
      this.invoiceDataUpdate.invoiceType = item.invoiceType;
      if (item.number) {
        this.invoiceDataUpdate.number = item.number;
        this.invoiceMediator.number = item.number;
      } else {
        this.invoiceDataUpdate.number = null;
        this.invoiceMediator.number = null;
      }
      this.invoiceTimer = setTimeout(() => {
        this.invoiceMaskShow = true;
      }, 500);
    }
  }
  public orderBillTouchEnd(e): void {
    e.stopPropagation();
    clearTimeout(this.invoiceTimer);
  }
  // close mask
  public closeInvoiceMask (): void {
    this.invoiceMaskShow = false;
    this.invoiceDataUpdate = {
      invoiceType: null,
      title: null,
      number: null,
    };
  }
  // save update invoice
  public saveBtnClick(): void {
    if (!(is_object(this.invoiceMediator, this.invoiceDataUpdate))) {
      this.srv.loading('修改中...');
      this.orderSrv.orderUpdInvoice(this.invoiceDataUpdate).subscribe(
       (val) => {
         this.srv.hide();
         this.clientMsg = val.message;
         this.onShow('addClient');
         this.orderInvocInitialize();
         this.invoiceMaskShow = false;
         this.invoiceDataUpdate = {
           invoiceType: null,
           title: null,
           number: null,
         };
       }
      );
    }
  }
  // blur
  public orderInvocBlur(e): void {
    window.scroll(0, 0);
  }
}
