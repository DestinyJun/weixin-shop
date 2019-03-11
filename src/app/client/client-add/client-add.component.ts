import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {
  DialogComponent,
  DialogConfig,
  InfiniteLoaderComponent,
  InfiniteLoaderConfig,
  MaskComponent,
  SkinType,
  ToastComponent,
  ToastService
} from 'ngx-weui';
import {ClientService} from '../../common/services/client.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ClientAddComponent implements OnInit {
  // data
  public addClient: any = {
    name: null
  };
  public addAddressRes: any = {
    name: null,
    phone: null,
    address: null,
  };
  public clientAddressList: any[] = [];
  public clientInvoiceList: any[] = [];
  public addButton = 'address';
  public clientId = {contactsId: '5'};
  public clientMaskInfo: any = {
    title: null,
    status: null
  };
  // radio
  public clientAddRadioRes: any = {
    invoiceType: 'individual',
    title: null,
    number: null,
  };
  public clientIndividualShow = false;
  // toast
  @ViewChild('addRemindToast') addRemindToast: ToastComponent;
  @ViewChild('addClientToast') addClientToast: ToastComponent;
  public clientMsg: string;
  // mask
  @ViewChild('clientAddMask') clientAddMask: MaskComponent;
  // Dialog
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  public configDialog: DialogConfig = {};
  // scroll
  public clientAddloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  // header
  public headerOption: HeaderContent = {
    title: '新增客户收货地址',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '保存',
      color: '#86B876'
    }
  };
  constructor(
    private clientSrv: ClientService,
    private srv: ToastService
  ) { }

  ngOnInit() {
    this.clientSelectClick();
  }
  public clientTabSelect(item) {
    if (item.heading === '地址') {
      this.addButton = 'address';
      return;
    }
    this.addButton = 'invoice';
  }
  // client Name
  public clinetNameChange (event): void {
    this.addClient.name = event.data;
    this.clientSrv.clientSearchName(this.addClient).subscribe(
      (val) => {
        console.log(val);
      }
    );
  }
  // select client
  public clientSelectClick (): void {
    this.clientSrv.clientGetAddress(this.clientId).subscribe(
      (val) => {
        if (val.status === 200) {
          this.clientAddressList = val.datas;
        }
      }
    );
    this.clientSrv.clientGetInvoice(this.clientId).subscribe(
      (val) => {
        if (val.status === 200) {
          this.clientInvoiceList = val.datas;
        }
      }
    );
  }
  // scroll
  public clientAddLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
  public saveAddClient (): void {
    if (!this.addClient.name) {
      this.onShow('addRemind');
      return;
    }
    this.srv.loading();
    this.clientSrv.clientAdd(this.addClient).subscribe(
      (val) => {
        if (val.status === 200) {
          this.srv.hide();
          this.clientMsg = val.message;
          this.onShow('addClient');
        }
      }
    );
  }
  // add && update
  public addAddressClick() {
    if (!this.addClient.name) {
      this.onShow('addRemind');
      return;
    }
    this.clientMaskInfo.status = 'add';
    if (this.addButton === 'address') {
      this.clientMaskInfo.title = '新增收货人地址';
      this.clientAddMask.show();
      return;
    }
    this.clientMaskInfo.title = '新增收货人地址';
    this.clientIndividualShow = true;
  }
  public saveAddressClick() {
    if (this.addButton === 'address') {
      if (this.clientMaskInfo.status === 'add') {
        this.addAddressRes.contactsId = '5';
        this.srv.loading('添加中...');
        this.clientSrv.clientAddAddress(this.addAddressRes).subscribe(
          (val) => {
            if (val.status === 200) {
              this.srv.hide();
              this.clientAddMask.hide();
              this.clientMsg = val.message;
              this.addAddressRes = {
                name: null,
                phone: null,
                address: null,
              };
              this.onShow('addClient');
              this.clientSelectClick();
            }
          }
        );
        return;
      }
      this.srv.loading('修改中...');
      this.clientSrv.clientUpdateAddress(this.addAddressRes).subscribe(
        (val) => {
          if (val.status === 200) {
            this.srv.hide();
            this.clientAddMask.hide();
            this.clientMsg = val.message;
            this.addAddressRes = {
              name: null,
              phone: null,
              address: null,
            };
            this.onShow('addClient');
            this.clientSelectClick();
          }
        }
      );
      return;
    }
    if (this.clientMaskInfo.status === 'add') {
      this.clientAddRadioRes.contactsId = '5';
      this.srv.loading('添加中...');
      this.clientSrv.clientAddInvoice(this.clientAddRadioRes).subscribe(
        (val) => {
          if (val.status === 200) {
            this.srv.hide();
            this.clientIndividualShow = false;
            this.clientMsg = val.message;
            this.clientAddRadioRes = {
              invoiceType: 'individual',
              title: null,
              number: null,
            };
            this.onShow('addClient');
            this.clientSelectClick();
          }
        }
      );
      return;
    }
    this.srv.loading('修改中...');
    this.clientSrv.clientUpdateInvoice(this.clientAddRadioRes).subscribe(
      (val) => {
        if (val.status === 200) {
          this.srv.hide();
          this.clientIndividualShow = false;
          this.clientMsg = val.message;
          this.clientAddRadioRes = {
            invoiceType: 'individual',
            title: null,
            number: null,
          };
          this.onShow('addClient');
          this.clientSelectClick();
        }
      }
    );
  }
  // update
  public clientUpdateClick (item): void {
    this.clientMaskInfo.status = 'update';
    if (this.addButton === 'address') {
      for (const prop in this.addAddressRes) {
        if (item) {
          this.addAddressRes[prop] = item[prop];
        }
      }
      this.addAddressRes.id = item.id;
      this.clientMaskInfo.title = '修改收货人地址';
      this.clientAddMask.show();
      return;
    }
    for (const prop in this.clientAddRadioRes) {
      if (item) {
        this.clientAddRadioRes[prop] = item[prop];
      }
    }
    this.clientAddRadioRes.id = item.id;
    this.clientMaskInfo.title = '修改发票信息';
    this.clientIndividualShow = true;
  }
  // remind + del
  public dialogDelShow(type: SkinType, msg: string, item: any, event) {
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
          if (this.addButton === 'address') {
            this.clientSrv.clientDelAddress({id: item.id}).subscribe(
              (val) => {
                if (val.status === 200) {
                  this.srv.hide();
                  this.clientMsg = val.message;
                  this.onShow('addClient');
                  this.clientSelectClick();
                }
              }
            );
            return;
          }
          this.clientSrv.clientDelInvoice({id: item.id}).subscribe(
            (val) => {
              if (val.status === 200) {
                this.srv.hide();
                this.clientMsg = val.message;
                this.onShow('addClient');
                this.clientSelectClick();
              }
            }
          );
        }
      });
    }, 10);
    return false;
  }
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
