import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Location} from '@angular/common';
import {
  DialogComponent,
  DialogConfig,
  InfiniteLoaderComponent,
  InfiniteLoaderConfig,
  SkinType, ToastComponent, ToastService
} from 'ngx-weui';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../common/services/global.service';
import {ClientService} from '../../common/services/client.service';

@Component({
  selector: 'app-client-address',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AddressListComponent implements OnInit {
  // data
  public clientList: any = null;
  // swipt
  public touchStartX: number;
  public touchMoveX: number;
  public touchStartPageY: number;
  public touchMovePageY: number;
  // toast
  @ViewChild('addRemindToast') addRemindToast: ToastComponent;
  @ViewChild('addClientToast') addClientToast: ToastComponent;
  public clientMsg: string;
  // Dialog
  @ViewChild('iosDelDialog') iosDelDialog: DialogComponent;
  public configDelDialog: DialogConfig = {};
  // header
  @Input() public headerOption: HeaderContent = {
    title: '收货地址',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '新增',
      color: '#6AABF1'
    }
  };
  // router
  public routerStatus: string = null;
  // scroll
  public clientloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  constructor(
    private router: Router,
    private clientSrv: ClientService,
    private globalService: GlobalService,
    private routerInfo: ActivatedRoute,
    private srv: ToastService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.routerInfo.params.subscribe(
      (val) => {
        this.routerStatus = val.status;
      }
    );
   this.tabClientInitialize();
  }
  // initialize
  public tabClientInitialize (): void {
    this.clientSrv.clientGetAddress({}).subscribe(
      (value) => {
        if (value['status'] === 200) {
          this.clientList = value.datas;
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `获取数据失败，错误码${value.status}`,
              url: null,
              btn: '请重试',
            }});
        }
      }
    );
  }
  // header
  public onHeaderRightClick(): void {
    this.router.navigate(['/client/addition'], {queryParams: {id: null, status: 'add'}});
  }
  // scroll
  public clientLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
  public scrollAddressClick (item): void {
    if (this.routerStatus === 'order') {
      this.globalService.addressEvent = item;
      this.location.back();
    }
  }
  // slide
  public onTouchstart (event): void {
    this.touchStartX = event.touches[0].pageX;
    this.touchStartPageY = event.touches[0].pageY;
  }
  public onTouchMove (event, item): void {
    this.touchMoveX = event.touches[0].pageX;
    this.touchMovePageY = event.touches[0].pageY;
    if (this.touchMoveX > this.touchStartX) {
      if (Math.abs(this.touchStartPageY - this.touchMovePageY) < 5 ) {
        if (Math.abs(this.touchMoveX - this.touchStartX) > 10) {
          item.editState = false;
        }
      }
      return;
    } else {
      if (Math.abs(this.touchStartPageY - this.touchMovePageY) < 5 ) {
        if (Math.abs(this.touchMoveX - this.touchStartX) > 10) {
          item.editState = true;
        }
      }
    }
  }
  // client
  public clientDeleteClick (id, event): void {
    event.stopPropagation();
    this.dialogDelShow('ios', {id: id, msg: '你确定删除当前客户吗？'});
  }
  public clientNameClick(id) {
    this.router.navigate(['/client/addition'], {queryParams: {id: id, status: 'update'}});
  }
  // remind
  public dialogDelShow(type: SkinType, item: any) {
    this.configDelDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      confirm: '是',
      cancel: '否',
      content: item.msg
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}DelDialog`]).show().subscribe((res: any) => {
        if (res.value) {
          this.srv.loading();
          this.clientSrv.clientDelAddress({id: item.id}).subscribe(
            (value) => {
              this.srv.hide();
              if (value.status === 200) {
                this.clientMsg = value.message;
                this.onShow('addClient');
                this.tabClientInitialize();
              } else {
                this.router.navigate(['/error'], {
                  queryParams: {
                    msg: `删除失败，错误码${value.status}`,
                    url: null,
                    btn: '请重试',
                  }});
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
