import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Location} from '@angular/common';
import {
  DialogComponent,
  DialogConfig,
  InfiniteLoaderConfig,
  MaskComponent,
  SkinType,
  ToastComponent,
  ToastService
} from 'ngx-weui';
import {ClientService} from '../../common/services/client.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {parse} from '../../common/tools/is_address';
import {timer} from 'rxjs';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AddressAddComponent implements OnInit {
  // data
  public addClient: any = {
    name: null
  };
  public addAddressRes: any = {
    name: null,
    phone: null,
    address: null,
    postcode: null,
  };
  public description: any;
  public clientAddressList: any = null;
  public clientInvoiceList: any = null;
  public bottomBtnStatus = 'address';
  public clientId: any = null;
  public clientStatus: string = null;
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
      title: '',
      color: '#6AABF1'
    }
  };
  constructor(
    private clientSrv: ClientService,
    private srv: ToastService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
        this.clientId = params.id;
        this.clientStatus = params.status;
        if (params.status === 'add') {
          this.headerOption.title = '新增收货地址';
        } else {
          this.headerOption.title = '修改收货地址';
          this.clientSrv.clientSearchInfo({id: params.id}).subscribe(
            (val) => {
              if (val.status === 200) {
                this.addClient.name = val.data.name;
              }
            }
          );
        }
    });
  }
  // add && update
  public saveBtnClick() {
      if (this.clientStatus === 'add') {
        this.srv.loading('添加中...');
        this.clientSrv.clientAddAddress(this.addAddressRes).subscribe(
          (value) => {
            if (value.status === 200) {
              this.srv.hide();
              this.clientMsg = value.message;
              this.description = null;
              this.addAddressRes = {
                name: null,
                phone: null,
                address: null,
              };
              this.onShow('addClient');
              timer(1000).subscribe(() => {
                this.location.back();
              });
              return;
            }
            this.router.navigate(['/error'], {
              queryParams: {
                msg: `操作失败，${value.message}`,
                url: null,
                btn: '请重试'
              }
            });
          }
        );
        return;
      }
      if (this.clientStatus === 'update') {
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
              return;
            }
            this.router.navigate(['/error'], {
              queryParams: {
                msg: `操作失败，${val.message}`,
                url: null,
                btn: '请重试'
              }
            });
          }
        );
        return;
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
    console.log(addressInfo);
    if (addressInfo['city'] === addressInfo['province']) {
      this.addAddressRes.address = addressInfo['province'] + addressInfo['area'] + addressInfo['addr'];
      this.addAddressRes.phone = addressInfo['phone'] || addressInfo['mobile'];
      this.addAddressRes.name = addressInfo['name'];
      this.addAddressRes.postcode = addressInfo['zip_code'];
      return;
    }
    this.addAddressRes.address = addressInfo['province'] + '省' + addressInfo['city'] + '市' + addressInfo['area'] + addressInfo['addr'];
    this.addAddressRes.phone = addressInfo['phone'] || addressInfo['mobile'];
    this.addAddressRes.name = addressInfo['name'];
    this.addAddressRes.postcode = addressInfo['zip_code'];
  }
}
