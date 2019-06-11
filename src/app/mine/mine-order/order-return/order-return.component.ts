import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {InfiniteLoaderConfig, ToastComponent, ToastService, Uploader, UploaderOptions} from 'ngx-weui';
import {EMPTY, timer} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
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
      icon: 'icon iconfont icon-fanhui'
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
  public detailsData: any = null;
  public orderReturn: any = {};
  public orderReturnRemark: any = null;
  // toast
  @ViewChild('mineOrderReturnToast') mineOrderReturnToast: ToastComponent;
  public mineOrderReturnMsg: string;
  // data
  public orderReturnImages: any = [];
  public orderReturnStatus: any = null;
  public orderReturnGallery = false;
  public orderReturnGalleryImg: any = null;
  public orderReturnProgress: any = [
    {title: '填写申请', subtitle: false, color: '#559FF0', shadow: '0 0 0 3px #B9DAFF', },
    {title: '货物寄回', subtitle: false, color: '#A6A6A6', shadow: '0 0 0 3px #D0D0D0', },
    {title: '商家收货', subtitle: false, color: '#A6A6A6', shadow: '0 0 0 3px #D0D0D0', },
    {title: '退款成功', subtitle: false, color: '#A6A6A6', shadow: '0 0 0 3px #D0D0D0', },
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
        this.orderReturnProgress[1].color = '#559FF0';
        this.orderReturnProgress[1].shadow = '0 0 0 3px #B9DAFF';
      }
      if (this.orderReturnStatus === 'refundded') {
        this.orderReturnProgress[2].color = '#559FF0';
        this.orderReturnProgress[2].shadow = '0 0 0 3px #B9DAFF';
      }
    });
  }
  public mineOrdReturnInit(id): void {
    this.mOrderSrv.mineOrdGetDetail({orderId: id}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.detailsData = val;
          this.orderReturn.refundamount  = val.data.amount;
          if (val.data.refundImage) {
            this.orderReturnImages = val.data.refundImage.split(',');
          }
          return;
        }
        this.router.navigate(['/error'], {
          queryParams: {
            msg: `查询订单详情失败，错误码${val.status}`,
            url: null,
            btn: '点击重试'
          }
        });
      }
    );
  }
  // img gallery
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
  // ngmodule
  public orderRefundRemarkChange(event): void {
    this.orderReturn.refundRemark = event;
  }
  // upload click
  public ordRefSubClick(type?: string) {
    if (this.orderReturnStatus === 'uploadVoucher') {
      this.orderReturn.refundType = 2;
    }
    if (type === 'cancel') {
      this.mOrderSrv.mineOrdCancelReFund({orderId: this.orderReturn.orderId }).subscribe((val) => {
        this.srv.hide();
        if (val.status === 200) {
          this.mineOrderReturnMsg = val.message;
          this.onShow('mineOrderRefund');
          timer(2000).subscribe(() => window.history.back());
        } else {
          this.mineOrderReturnMsg = val.message;
          this.onShow('mineOrderRefund');
        }
      });
      return;
    }
    img_upload.delete('file');
    file_num.forEach((value) => {
      img_upload.append('file', value);
    });
    this.srv.loading();
    if (img_upload.get('file')  === null) {
      this.mOrderSrv.mineOrdReFund(this.orderReturn).subscribe(
        (val) => {
          this.srv.hide();
          if (val.status === 200) {
            this.mineOrderReturnMsg = val.message;
            this.onShow('mineOrderReturn');
            timer(2000).subscribe(() => window.history.back());
          } else {
            this.mineOrderReturnMsg = val.message;
            this.onShow('mineOrderReturn');
          }
        });
      return;
    }
    this.mOrderSrv.mineOrdImgUpload(img_upload).pipe(
      mergeMap((val) => {
        if (val.status === 200) {
          let img_string = '';
          val.dataObject.map((prop) => {
            img_string = img_string + prop + ',';
          });
          this.orderReturn.refundImage = img_string.substring(0, img_string.length - 1);
          return this.mOrderSrv.mineOrdReFund(this.orderReturn);
        }
        this.mineOrderReturnMsg = val.message;
        this.onShow('mineOrderReturn');
        return EMPTY;
      })
    ).subscribe((val) => {
      this.srv.hide();
      if (val.status === 200) {
        this.mineOrderReturnMsg = val.message;
        this.onShow('mineOrderReturn');
        timer(2000).subscribe(() => window.history.back());
      } else {
        this.mineOrderReturnMsg = val.message;
        this.onShow('mineOrderReturn');
      }
    });
  }
  // toast
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
