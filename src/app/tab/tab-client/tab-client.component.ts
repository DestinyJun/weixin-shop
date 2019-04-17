import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {
  DialogComponent,
  DialogConfig,
  InfiniteLoaderComponent,
  InfiniteLoaderConfig, MaskComponent,
  SkinType
} from 'ngx-weui';
import {Router} from '@angular/router';
import {TabService} from '../../common/services/tab.service';
import {GlobalService} from '../../common/services/global.service';

@Component({
  selector: 'app-tab-client',
  templateUrl: './tab-client.component.html',
  styleUrls: ['./tab-client.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TabClientComponent implements OnInit {
  // swipt
  public touchStartX: number;
  public touchMoveX: number;
  public touchStartPageY: number;
  public touchMovePageY: number;
  // Dialog
  @ViewChild('iosDelDialog') iosDelDialog: DialogComponent;
  public configDelDialog: DialogConfig = {};
  // mask
  @ViewChild('tabClientMask') tabClientMask: MaskComponent;
  // header
  @Input() public headerOption: HeaderContent = {};
  // router
  @Input() public routerStatus: string = null;
  // client
  public clientList: any = null;
  public clientAddressList: any[];
  public clientName: string;
  public clientUpdateName: any = {
    name: null,
    id: null
  };
  public clientloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  constructor(
    private router: Router,
    private tabService: TabService,
    private globalService: GlobalService
  ) {
  }

  ngOnInit() {
   this.tabClientInitialize();
  }
  // initialize
  public tabClientInitialize (): void {
    this.clientList = null;
    this.tabService.tabGetClientList().subscribe(
      (value) => {
        if (value['status'] === 200) {
          value['datas'].map((val) => {
            val.editState = false;
          });
          this.clientList = value['datas'];
          this.clientSerialization(value['datas']);
        }
      }
    );
  }
  // header
  public onHeaderRightClick(): void {
    this.router.navigate(['/client/add', {id: null, status: 'add'}]);
  }
  // search
  public onBarSearch(term: string) {
    // this.searchKeyword = term;
    if (term) {
      this.tabService.tabSearchClientList({name: term}).subscribe(
        (value) => {
          if (value['status'] === 200) {
            value['datas'].map((val) => {
              val.editState = false;
            });
            this.clientList = value['datas'];
            this.clientSerialization(value['datas']);
          }
        }
      );
      return;
    }
    this.tabClientInitialize();
  }
  public onBarCancel(): void {
    this.tabClientInitialize();
  }
  public onBarClear(): void {
    this.tabClientInitialize();
  }
  // scroll
  public clientLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
  public scrollAddressClick (item): void {
    if (this.routerStatus === 'order') {
      item.parentId = this.clientUpdateName.id;
      this.globalService.addressEvent = item;
      window.history.back();
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
      // console.log('右滑呀');
      return;
    } else {
      if (Math.abs(this.touchStartPageY - this.touchMovePageY) < 5 ) {
        if (Math.abs(this.touchMoveX - this.touchStartX) > 10) {
          item.editState = true;
        }
      }
      // console.log('左滑呀');
    }
  }
  // client
  public clientDeleteClick (id): void {
    this.dialogDelShow('ios', {id: id, msg: '你确定删除当前客户吗？'});
  }
  public clientNameClick(item, type: 'address' | 'update') {
    this.clientUpdateName.id = item.id;
    this.tabClientMask.show();
    if (type === 'address') {
      this.clientName = item.name;
      this.tabService.tabGetClientAdrs({contactsId: item.id}).subscribe(
        (val) => {
          if (val.status === 200) {
            this.clientAddressList = val.datas;
          }
        }
      );
      return;
    }
    this.router.navigate(['/client/add',  {id: item.id, status: 'update'}]);
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
          this.tabService.tabDeleteClient(item.id).subscribe(
            (value) => {},
            error => console.log(error),
            () => {
              this.tabClientInitialize();
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
