import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, timer} from 'rxjs';
import {OrderService} from '../../common/services/order.service';
import {GlobalService} from '../../common/services/global.service';
import {DialogComponent, DialogConfig, SkinType, ToastComponent, ToastService} from 'ngx-weui';

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
  public orderClientId: any = null;
  public invoiceDataUpdate: any = {
    id: null,
    invoiceType: null,
    title: null,
    number: null,
  };
  public invoiceMaskShow = false;
  constructor(
    private orderSrv: OrderService,
    private globalSrv: GlobalService,
    private routeInfo: ActivatedRoute,
    private srv: ToastService,
    private router: Router,
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
  // radio change
  public radioResChanges() {
    if (this.orderAddRadioRes.invoiceType === 'noinvoice') {
      this.globalSrv.invoiceEvent = null;
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
            this.orderInvocInitialize();
          }
        }
      );
    }
  }
  // bill click
  public orderBillClick (event, item): void {
    event.preventDefault();
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
              if (val.status === 200) {
                this.srv.hide();
                this.clientMsg = val.message;
                this.onShow('addClient');
                this.orderInvocInitialize();
              } else {
                this.router.navigate(['/error'], {
                  queryParams: {
                    msg: `删除失败，错误码${val.status}`,
                    url: null,
                    btn: '请重试'
                  }
                });
              }
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
  // TouchStart
  public orderBillTouchStart(event, item): void {
    if (event) {
      console.log(event);
      this.invoiceDataUpdate.id = item.id;
      this.invoiceDataUpdate.title = item.title;
      this.invoiceDataUpdate.invoiceType = item.invoiceType;
      if (item.number) {
        this.invoiceDataUpdate.number = item.number;
      }
      timer(500).subscribe(
        (val) => {
          this.invoiceMaskShow = true;
        }
      );
    }
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
    this.srv.loading('修改中...');
    this.orderSrv.orderUpdInvoice(this.invoiceDataUpdate).subscribe(
      (val) => {
        if (val.status === 200) {
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
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `发票修改失败，错误码${val.status}`,
              url: null,
              btn: '请重试'
            }
          });
        }
      }
    );
  }
}
