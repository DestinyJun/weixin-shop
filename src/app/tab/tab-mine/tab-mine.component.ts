import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';
import {MineService} from '../../common/services/mine.service';
import {forkJoin} from 'rxjs';
import {GlobalService} from '../../common/services/global.service';
import {Router} from '@angular/router';

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
  public mineUserInfo: any = null;
  constructor(
    private mineSrv: MineService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tabMineDateInit();
  }
  public tabMineDateInit (): void {
    forkJoin([this.mineSrv.mineGetOrderNum(), this.mineSrv.mineGetUserInfo()]).subscribe(
      (val) => {
        if (val) {
          Object.keys(val[0].dataObject).forEach((prop) => {
            this.orderNum.map((item) => {
              if (item.status === prop) {
                item.amount = val[0].dataObject[prop];
              }
            });
          });
          this.mineUserInfo = val[1].data;
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `获取数据失败，请检查网络后重试！`,
              url: null,
              btn: '请重试',
            }});
        }
      }
    );
  }
  public dialogShow(type: SkinType) {
    this.configDialog = Object.assign({}, <DialogConfig>{
      skin: type,
      cancel: '取消',
      confirm: '一键拨号',
      content: '<p>' +
        '<span>服务电话</span><br>' +
        '<span>400-8485-5577</span>' +
        '</p>'
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
