import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Location} from '@angular/common';
import {
  DialogComponent,
  DialogConfig,
  InfiniteLoaderComponent,
  InfiniteLoaderConfig, MaskComponent,
  SkinType, ToastComponent, ToastService
} from 'ngx-weui';
import {ActivatedRoute, Router} from '@angular/router';
import {TabService} from '../../common/services/tab.service';
import {GlobalService} from '../../common/services/global.service';
import {ClientService} from '../../common/services/client.service';

@Component({
  selector: 'app-client-address',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AddressListComponent implements OnInit {
  // swipt
  public touchStartX: number;
  public touchMoveX: number;
  public touchStartPageY: number;
  public touchMovePageY: number;
  // toast
  @ViewChild('addRemindToast') addRemindToast: ToastComponent;
  @ViewChild('addClientToast') addClientToast: ToastComponent;
  // Dialog
  @ViewChild('iosDelDialog') iosDelDialog: DialogComponent;
  public configDelDialog: DialogConfig = {};
  // mask
  @ViewChild('tabClientMask') tabClientMask: MaskComponent;
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
  // client
  public clientList: any = null;
  public clientUpdateName: any = {
    name: null,
    id: null
  };
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
        console.log(value);
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
    console.log(item);
    if (this.routerStatus === 'order') {
      item.parentId = this.clientUpdateName.id;
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
  public clientDeleteClick (id): void {
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
          this.clientSrv.clientDelAddress(item.id).subscribe(
            (value) => {
              this.srv.hide();
              console.log(value);
              if (value.status === 200) {
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
  // client Serialization
  public clientSerialization(params): void {
    this.clientList = [];
    const a = [];
    const b = [];
    params.map((item) => {
        b.push(item.firstPY);
    });
    for (const s in b) {
      if (b) {
        if (a.indexOf(b[s]) < 0) {
          a.push(b[s]);
        }
      }
    }
    a.map((val) => {
      const c = [];
      params.map((pItem) => {
        if (pItem.firstPY === val) {
          c.push(pItem);
        }
      });
      this.clientList.push({name: val, value: c });
    });
  }
}
