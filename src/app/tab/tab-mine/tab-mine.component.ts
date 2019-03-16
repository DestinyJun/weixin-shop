import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DialogComponent, DialogConfig, SkinType} from 'ngx-weui';

@Component({
  selector: 'app-tab-mine',
  templateUrl: './tab-mine.component.html',
  styleUrls: ['./tab-mine.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TabMineComponent implements OnInit {
  @ViewChild('tel') public tel: ElementRef;
  public orderList: any = [
    {name: '待付款', amount: 156},
    {name: '待收货', amount: 6},
    {name: '已完成', amount: 50},
    {name: '退货', amount: 6},
  ];
  // Dialog组件
  @ViewChild('iosDialog') iosDialog: DialogComponent;
  public configDialog: DialogConfig = {};
  constructor() { }

  ngOnInit() {}
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
