import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';
import {MineService} from '../../common/services/mine.service';

@Component({
  selector: 'app-tab-mine',
  templateUrl: './tab-mine.component.html',
  styleUrls: ['./tab-mine.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TabMineComponent implements OnInit {
  @ViewChild('tel') public tel: ElementRef;
  public orderNum: any = [
    {name: '全部', amount: 0, status: 'all'},
    {name: '待付款', amount: 0, status: 'pendingPayment'},
    {name: '待收货', amount: 0, status: 'shipped'},
    {name: '已完成', amount: 0, status: 'completed'},
    {name: '退货', amount: 0, status: 'return'},
  ];
  // Dialog组件
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  public configDialog: DialogConfig = {};
  constructor(
    private mineSrv: MineService
  ) { }

  ngOnInit() {
    this.tabMineDateInit();
  }
  public tabMineDateInit (): void {
    this.mineSrv.mineGetOrderNum().subscribe(
      (val) => {
        if (val.status === 200) {
          Object.keys(val.dataObject).forEach((prop) => {
            this.orderNum.map((item) => {
              if (item.status === prop) {
                item.amount = val.dataObject[prop];
              }
            });
          });
        }
      }
    );
  }
  public dialogShow(type: SkinType) {
    this.configDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: '取消',
      confirm: '一键拨号',
      content: '<p>服务电话</p><p>400-8485-5577</p>'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}Dialog`]).show().subscribe((res: any) => {
        if (res.value) {
          this.tel.nativeElement.click();
        }
      });
    }, 10);
    return false;
  }

}
