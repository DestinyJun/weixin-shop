import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {DialogComponent, DialogConfig, SkinType, ToastComponent} from 'ngx-weui';
import {WjDialogPay} from '../../common/components/wj-dialog/wj-dialog.component';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ClientAddComponent implements OnInit {
  // add dialog
  public addDialogShow = true;
  public addDialogConfig = new WjDialogPay(true, '弹窗标题', true, true, );
  public inputRes: any = {
    name: ''
  };
  // toast
  @ViewChild('success') successToast: ToastComponent;
  // Dialog
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  @ViewChild('iosAddInfo') iosAddInfo: DialogComponent;
  public configDialog: DialogConfig = {};
  public configAddInfo: DialogConfig = {};
  // add
  public addRes: any = {
    name: null,
    phone: null,
    address: null,
    description: null
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
  constructor() { }

  ngOnInit() {
  }
  public onSelect() {}
  public addAddressClick (): void {
    this.addDialogShow = true;
    /*if (!this.inputRes.name) {
      this.onToastShow('success');
    }*/
  }
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
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
  public onDialogPayClick(event): void {
    this.addDialogShow = event.show;
  }
}
