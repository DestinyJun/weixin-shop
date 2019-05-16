import {Component, Input, OnInit} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {InfiniteLoaderConfig, ToastService, Uploader, UploaderOptions} from 'ngx-weui';
import {Observable} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';
const img_upload: FormData = new FormData();
const file_num = [];
@Component({
  selector: 'app-order-return',
  templateUrl: './order-return.component.html',
  styleUrls: ['./order-return.component.less']
})
export class OrderReturnComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '申请退货',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // scroll
  ordAftScrollConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  // details
  public orderDetailsData: Observable<any>;
  public orderReturn: any = {};
  // data
  public orderReturnStatus: any = null;
  public orderReturnSubmitShow = true;
  public orderReturnProgress: any = [
    {title: '填写申请', color: '#7FB56E', shadow: '0 0 0 3px #BFDAB6'},
    {title: '等待审核', color: '#969696', shadow: '0 0 0 3px #969696'},
    {title: '货物寄回', color: '#969696', shadow: '0 0 0 3px #969696'},
    {title: '商家收货', color: '#969696', shadow: '0 0 0 3px #969696'},
    {title: '退款成功', color: '#969696', shadow: '0 0 0 3px #969696'},
  ];
  // upload
  @Input() url = 'example';
  public img: any;
  public imgShow = false;
  public uploader: Uploader = new Uploader(<UploaderOptions>{
    onFileQueued: function () {
      file_num.push(arguments[0]._file);
    },
    onFileDequeued: function () {
      const file_arguments = arguments;
      file_num.forEach((value, key) => {
        if (value.name === file_arguments[0]._file.name) {
          file_num.splice(key, 1);
        }
      });
    },
  });
  constructor(
    private mOrderSrv: MineOrderService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private srv: ToastService,
  ) { }

  ngOnInit() {
    this.routerInfo.params.subscribe(params => {
      this.mineOrdReturnInit(params.id);
      this.orderReturn.orderId = params.id;
      this.orderReturn.refundType = params.type;
      this.orderReturnStatus = params.status;
      if (this.orderReturnStatus === 'refundReview') {
        this.orderReturnSubmitShow = false;
        this.orderReturnProgress[1].color = '#7FB56E';
        this.orderReturnProgress[1].shadow = '0 0 0 3px #BFDAB6';
      }
      if (this.orderReturnStatus === 'refundded') {
        this.orderReturnSubmitShow = false;
        this.orderReturnProgress[2].color = '#7FB56E';
        this.orderReturnProgress[2].shadow = '0 0 0 3px #BFDAB6';
      }
    });
  }
  public mineOrdReturnInit(id): void {
    this.orderDetailsData = this.mOrderSrv.mineOrdGetDetail({orderId: id});
  }
  public onGallery(item: any) {
    this.img = [{file: item._file, item: item}];
    this.imgShow = true;
  }
  public onDel(item: any, event) {
    if (event) {
      event.stopPropagation();
      this.uploader.removeFromQueue(item);
      return;
    }
    this.uploader.removeFromQueue(item.item);
  }
  public ordRefSubClick() {
    this.uploader.uploadAll();
  }
}
