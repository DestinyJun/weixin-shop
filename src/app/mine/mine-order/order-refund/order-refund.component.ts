import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {InfiniteLoaderConfig, ToastComponent, ToastService, Uploader, UploaderOptions} from 'ngx-weui';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
const img_upload: FormData = new FormData();
const file_num = [];
@Component({
  selector: 'app-order-refund',
  templateUrl: './order-refund.component.html',
  styleUrls: ['./order-refund.component.less']
})
export class OrderRefundComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '申请退款',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // scroll
  public ordAftScrollConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  // details
  public detailsData: any = null;
  public orderRefund: any = {};
  public orderRefundRemark: any = null;
  // toast
  @ViewChild('mineOrderRefundToast') mineOrderRefundToast: ToastComponent;
  public mineOrderRefundMsg: string;
  // data
  public orderRefundImages: any = [];
  public orderRefundStatus: any = null;
  public orderRefundGallery = false;
  public orderRefundGalleryImg: any = null;
  public orderRefundProgress: any = [
    {title: '填写申请', color: '#559FF0', shadow: '0 0 0 3px #B9DAFF'},
    {title: '等待审核', color: '#A6A6A6', shadow: '0 0 0 3px #D0D0D0'},
    {title: '退款成功', color: '#A6A6A6', shadow: '0 0 0 3px #D0D0D0'},
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
  ) {
  }

  ngOnInit() {
    this.routerInfo.params.subscribe((params) => {
      this.mineOrdRefundInit(params.id);
      this.orderRefund.orderId = params.id;
      this.orderRefund.refundType = params.type;
      this.orderRefundStatus = params.status;
      if (this.orderRefundStatus === 'refundReview') {
        this.orderRefundProgress[1].color = '#559FF0';
        this.orderRefundProgress[1].shadow = '0 0 0 3px #B9DAFF';
      }
      if (this.orderRefundStatus === 'refundded') {
        this.orderRefundProgress[2].color = '#559FF0';
        this.orderRefundProgress[2].shadow = '0 0 0 3px #B9DAFF';
      }
    });
  }
  // order data init
  public mineOrdRefundInit(id): void {
     this.mOrderSrv.mineOrdGetDetail({orderId: id}).subscribe(
       (val) => {
         console.log(val);
         if (val.status === 200) {
           this.detailsData = val;
           this.orderRefund.refundamount = val.data.amount;
           if (val.data.refundImage) {
             this.orderRefundImages = val.data.refundImage.split(',');
           }
         } else {
            this.router.navigate(['/error'], {
              queryParams: {
                msg: `查询订单详情失败，错误码${val.status}`,
                url: null,
                btn: '点击重试'
              }
            });
         }
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
    this.orderRefund.refundRemark = event;
  }
  // submit click
  public ordRefSubClick(type?: string) {
    if (type === 'cancel') {
      console.log({orderId: this.orderRefund.orderId});
      this.mOrderSrv.mineOrdCancelReFund({orderId: this.orderRefund.orderId}).subscribe((val) => {
        this.srv.hide();
        console.log(val);
        if (val.status === 200) {
          this.mineOrderRefundMsg = val.message;
          this.onShow('mineOrderRefund');
          timer(2000).subscribe(() => window.history.back());
        } else {
          this.mineOrderRefundMsg = val.message;
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
       this.mOrderSrv.mineOrdReFund(this.orderRefund).subscribe(
      (val) => {
        this.srv.hide();
        console.log(val);
        if (val.status === 200) {
          this.mineOrderRefundMsg = val.message;
          this.onShow('mineOrderRefund');
          timer(2000).subscribe(() => window.history.back());
        } else {
          this.mineOrderRefundMsg = val.message;
          this.onShow('mineOrderRefund');
        }
        });
       return;
    }
    this.mOrderSrv.mineOrdImgUpload(img_upload).pipe(
      mergeMap((val) => {
        console.log(val);
        if (val.status === 200) {
          let img_string = '';
          val.dataObject.map((prop) => {
            img_string = img_string + prop + ',';
          });
          this.orderRefund.refundImage = img_string.substring(0, img_string.length - 1);
          return this.mOrderSrv.mineOrdReFund(this.orderRefund);
        }
        this.mineOrderRefundMsg = val.message;
        this.onShow('mineOrderRefund');
        return EMPTY;
      })
    ).subscribe((val) => {
      this.srv.hide();
      if (val.status === 200) {
        this.mineOrderRefundMsg = val.message;
        this.onShow('mineOrderRefund');
        timer(2000).subscribe(() => window.history.back());
      } else {
        this.mineOrderRefundMsg = val.message;
        this.onShow('mineOrderRefund');
      }
    });
  }
  // toast
  public onShow(type: string) {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
