import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogComponent, DialogConfig, MaskComponent, SkinType, ToastComponent, ToastService} from 'ngx-weui';
import {ClientService} from '../../common/services/client.service';

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
  // toast
  @ViewChild('addRemindToast') addRemindToast: ToastComponent;
  @ViewChild('addClientToast') addClientToast: ToastComponent;
  @ViewChild('loading') loadingToast: ToastComponent;
  public clientMsg: string;
  // mask
  @ViewChild('clientAddMask') clientAddMask: MaskComponent;
  // Dialog
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  public configDialog: DialogConfig = {};
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
  }
  public onSelect() {}
  public dialogDelShow(type: SkinType, msg: string) {
    console.log(type);
    this.configDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      confirm: '是',
      cancel: '否',
      content: msg
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Dialog`]).show().subscribe((res: any) => {
        console.log(res);
        if (res.value) {
          // this.tel.nativeElement.click();
        }
      });
    }, 10);
    return false;
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
  public addAddressClick() {
    if (!this.addClient.name) {
      this.onShow('addRemind');
      return;
    }
    this.clientAddMask.show();
  }
  public saveAddressClick() {
    this.addAddressRes.contactsId = '5';
    this.srv.loading('添加中...');
    this.clientSrv.clientAddAddress(this.addAddressRes).subscribe(
      (value) => {
        if (value.status === 200) {
          // this.srv.hide();
          this.clientMsg = value.message;
          this.onShow('addClient');
        }
      }
    );
  }
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
