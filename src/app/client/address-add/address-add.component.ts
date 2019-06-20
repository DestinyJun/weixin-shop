import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Location} from '@angular/common';
import {
  DialogComponent,
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
  public clientId: any = null;
  public clientStatus: string = null;
  // toast
  @ViewChild('addRemindToast') addRemindToast: ToastComponent;
  @ViewChild('addClientToast') addClientToast: ToastComponent;
  public clientMsg: string;
  // Dialog
  @ViewChild('iosDialog') iosDialog: DialogComponent;
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
          this.clientSrv.clientGetAddressItem({id: params.id}).subscribe(
            (val) => {
              if (val.status === 200) {
                this.addAddressRes = {
                  name: val.data.name,
                  phone: val.data.phone,
                  address: val.data.address,
                  postcode: val.data.postcode,
                };
                return;
              }
              this.router.navigate(['/error'], {
                queryParams: {
                  msg: `初始化失败，错误码${val.status}`,
                  url: null,
                  btn: '请重试',
                }});
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
        this.addAddressRes.id = this.clientId;
        this.srv.loading('修改中...');
        this.clientSrv.clientUpdateAddress(this.addAddressRes).subscribe(
          (val) => {
            if (val.status === 200) {
              this.srv.hide();
              this.clientMsg = val.message;
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
                msg: `修改失败，${val.message}`,
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
      this.addAddressRes.postcode = addressInfo['zip_code'];
      return;
    }
    this.addAddressRes.address = addressInfo['province'] + '省' + addressInfo['city'] + '市' + addressInfo['area'] + addressInfo['addr'];
    this.addAddressRes.phone = addressInfo['phone'] || addressInfo['mobile'];
    this.addAddressRes.name = addressInfo['name'];
    this.addAddressRes.postcode = addressInfo['zip_code'];
  }
}
