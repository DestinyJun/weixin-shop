import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {
  ActionSheetComponent,
  ActionSheetConfig,
  DialogComponent,
  DialogConfig,
  InfiniteLoaderComponent,
  InfiniteLoaderConfig, MaskComponent,
  SkinType
} from 'ngx-weui';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
  public clientList = [];
  public clientAddressList: any[];
  public clientName: string;
  public clientMaskShow: boolean;
  public clientUpdateName: any = {
    name: null,
    id: null
  };
  // search
  public searchItems: Observable<string[]>;
  public value: string;
  // scroll
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
    this.tabService.tabGetClientList().subscribe(
      (value) => {
        if (value['status'] === 200) {
          value['datas'].map((val) => {
            val.editState = false;
          });
          this.clientList = value['datas'];
        } else {
          console.log(value['status']);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('完成');
      }
    );
  }
  // header
  public onHeaderRightClick(): void {
    this.router.navigate(['/client/add']);
  }
  // search
  public onBarSearch(term: string) {
    this.value = term;
    // if (term) this.items = this.tbService.search(term);
  }
  public onBarCancel(): void {
    console.log('onCancel');
  }
  public onBarClear(): void {
    console.log('onCancel');
  }
  public onBarSubmit(value: string): void {
    console.log('onSubmit', value);
  }
  // scroll
  public clientLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
  public scrollAddressClick (item): void {
    if (this.routerStatus === 'order') {
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
      console.log('右滑呀');
      return;
    } else {
      if (Math.abs(this.touchStartPageY - this.touchMovePageY) < 5 ) {
        if (Math.abs(this.touchMoveX - this.touchStartX) > 10) {
          item.editState = true;
        }
      }
      console.log('左滑呀');
    }
  }
  // client
  public clientDeleteClick (id): void {
    this.dialogDelShow('ios', {id: id, msg: '你确定删除当前客户吗？'});
  }
  public clientNameClick(item, type: 'address' | 'update') {
    console.log(item.id);
    this.clientUpdateName.id = item.id;
    this.tabClientMask.show();
    if (type === 'address') {
      this.clientMaskShow = true;
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
    this.clientMaskShow = false;
    this.tabService.tabUpdateClientName(this.clientUpdateName).subscribe(
      (val) => {
        if (val.status === 200) {
          console.log(val);
          this.tabClientInitialize();
        }
      }
    );
  }
  // remind
  public dialogDelShow(type: SkinType, item: any) {
    console.log(item);
    this.configDelDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      confirm: '是',
      cancel: '否',
      content: item.msg
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}DelDialog`]).show().subscribe((res: any) => {
        console.log(res);
        if (res.value) {
          this.tabService.tabDeleteClient(item.id).subscribe(
            (value) => {},
            error => console.log(error),
            () => {
              this.tabClientInitialize();
              this.globalService.remindEvent.next({msg: '删除成功', type: 'success'});
            }
          );
        }
      });
    }, 10);
    return false;
  }
}
