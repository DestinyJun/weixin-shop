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
import {ActivatedRoute, Params} from '@angular/router';
import {parse} from '../../common/tools/is_address';

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
  public description: any;
  public clientAddressList: any = null;
  public clientInvoiceList: any = null;
  public bottomBtnStatus = 'address';
  public clientId: any = null;
  public clientMaskTitle = '新增客户收获地址';
  public clientStatus: string = null;
  public clientSaveBtnStatus = 'add';
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
    title: '',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '保存',
      color: '#6AABF1'
    }
  };
  constructor(
    private clientSrv: ClientService,
    private srv: ToastService,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerInfo.params.subscribe(
      (params: Params) => {
        this.clientId = params.id;
        this.clientStatus = params.status;
        if (params.status === 'add') {
          this.headerOption.title = '新增客户收货地址';
        } else {
          this.headerOption.title = '修改客户收货地址';
          this.clientSrv.clientSearchInfo({id: params.id}).subscribe(
            (val) => {
              if (val.status === 200) {
                this.addClient.name = val.data.name;
                console.log(this.addClient.name);
              }
            }
          );
          this.clientSelectClick();
        }
    });
  }
  public clientTabSelect(item) {
    if (item.heading === '地址') {
      this.bottomBtnStatus = 'address';
      return;
    }
    this.bottomBtnStatus = 'invoice';
  }
  // client Name
  public clinetNameChange (): void {
    if (this.clientStatus === 'add') {
      this.clientId = 'null';
    }
  }
  // select client address and invoice
  public clientSelectClick (): void {
    this.clientSrv.clientGetAddress({contactsId: this.clientId}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.clientAddressList = val.datas;
        }
      }
    );
    this.clientSrv.clientGetInvoice({contactsId: this.clientId}).subscribe(
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
  // header
  public saveHeaderClick (): void {
    if (!this.addClient.name) {
      this.onShow('addRemind');
      return;
    }
    if (this.clientStatus === 'add') {
      this.srv.loading();
      this.clientSrv.clientAdd(this.addClient).subscribe(
        (val) => {
          if (val.status === 200) {
            this.srv.hide();
            this.clientMsg = val.message;
            this.clientId = val.data.id;
            this.clientSelectClick();
            this.onShow('addClient');
          }
        }
      );
    } else if (this.clientStatus === 'update') {
      this.addClient.id = this.clientId;
      this.srv.loading();
      this.clientSrv.clientNameUpdate(this.addClient).subscribe(
        (val) => {
          if (val.status === 200) {
            this.srv.hide();
            this.clientMsg = val.message;
            this.onShow('addClient');
          }
        }
      );
    }
  }
  // add && update
  public bottomBtnClick() {
    this.clientSaveBtnStatus = 'add';
    if (!this.addClient.name) {
      this.onShow('addRemind');
      return;
    }
    if (this.bottomBtnStatus === 'address') {
      this.clientMaskTitle = '新增收货人地址';
      this.clientAddMask.show();
      return;
    } else if (this.bottomBtnStatus === 'invoice') {
      this.clientMaskTitle = '新增发票信息';
    this.clientIndividualShow = true;
    }
  }
  public saveBtnClick(type) {
    if (this.bottomBtnStatus === 'address') {
      if (type === 'add') {
        this.srv.loading('添加中...');
         if (this.clientId !== 'null') {
           this.addAddressRes.contactsId = this.clientId;
           this.clientSrv.clientAddAddress(this.addAddressRes).subscribe(
             (value) => {
               if (value.status === 200) {
                 this.srv.hide();
                 this.clientAddMask.hide();
                 this.clientMsg = value.message;
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
         } else {
           this.clientSrv.clientAdd(this.addClient).subscribe(
             (val) => {
               if (val.status === 200) {
                 this.clientId = val.data.id;
                 this.addAddressRes.contactsId = this.clientId;
                 this.clientSrv.clientAddAddress(this.addAddressRes).subscribe(
                   (value) => {
                     if (value.status === 200) {
                       this.srv.hide();
                       this.clientAddMask.hide();
                       this.clientMsg = value.message;
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
               }
             }
           );
         }
        return;
      } else if (type === 'update') {
        this.addAddressRes.contactsId = this.clientId;
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
    } else if (this.bottomBtnStatus === 'invoice') {
      if (type === 'add') {
        this.srv.loading('添加中...');
        if (this.clientId !== 'null') {
          this.clientAddRadioRes.contactsId = this.clientId;
          this.clientSrv.clientAddInvoice(this.clientAddRadioRes).subscribe(
            (value) => {
              if (value.status === 200) {
                this.srv.hide();
                this.clientAddMask.hide();
                this.clientMsg = value.message;
                this.clientAddRadioRes = {
                  invoiceType: 'individual',
                  title: null,
                  number: null,
                };
                this.clientIndividualShow = false;
                this.onShow('addClient');
                this.clientSelectClick();
              }
            }
          );
        } else {
          this.clientSrv.clientAdd(this.addClient).subscribe(
            (val) => {
              if (val.status === 200) {
                this.clientId = val.data.id;
                this.clientAddRadioRes.contactsId = this.clientId;
                this.clientSrv.clientAddInvoice(this.clientAddRadioRes).subscribe(
                  (value) => {
                    if (value.status === 200) {
                      this.srv.hide();
                      this.clientAddMask.hide();
                      this.clientMsg = value.message;
                      this.clientAddRadioRes = {
                        invoiceType: 'individual',
                        title: null,
                        number: null,
                      };
                      this.clientIndividualShow = false;
                      this.onShow('addClient');
                      this.clientSelectClick();
                    }
                  }
                );
              }
            }
          );
        }
        return;
      } else if (type === 'update') {
        this.addAddressRes.contactsId = this.clientId;
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
    }
  }
  // close
  public closeAddressMask (): void {
    this.clientAddMask.hide();
    this.addAddressRes = {
      name: null,
      phone: null,
      address: null,
    };
  }
  // update
  public clientUpdateClick (item): void {
    this.clientSaveBtnStatus = 'update';
    if (this.bottomBtnStatus === 'address') {
      for (const prop in this.addAddressRes) {
        if (item) {
          this.addAddressRes[prop] = item[prop];
        }
      }
      this.addAddressRes.id = item.id;
      this.clientMaskTitle = '修改收货人地址';
      this.clientAddMask.show();
      return;
    } else if (this.bottomBtnStatus === 'invoice') {
      for (const prop in this.clientAddRadioRes) {
        if (item) {
          this.clientAddRadioRes[prop] = item[prop];
        }
      }
      this.clientAddRadioRes.id = item.id;
      this.clientMaskTitle = '修改发票信息';
      this.clientIndividualShow = true;
    }
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
          if (this.bottomBtnStatus === 'address') {
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
  // Address recognition
  public clientAddChange(event): void {
    const addressInfo = parse(event);
    if (addressInfo['city'] === addressInfo['province']) {
      this.addAddressRes.address = addressInfo['province'] + addressInfo['area'] + addressInfo['addr'];
      this.addAddressRes.phone = addressInfo['phone'] || addressInfo['mobile'];
      this.addAddressRes.name = addressInfo['name'];
      return;
    }
    this.addAddressRes.address = addressInfo['province'] + '省' + addressInfo['city'] + '市' + addressInfo['area'] + addressInfo['addr'];
    this.addAddressRes.phone = addressInfo['phone'] || addressInfo['mobile'];
    this.addAddressRes.name = addressInfo['name'];
  }
}
