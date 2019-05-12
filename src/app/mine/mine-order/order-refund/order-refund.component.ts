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
      icon: 'fa fa-chevron-left'
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
         } else {

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
  // upload click
  public ordRefSubClick() {
    img_upload.delete('file');
    file_num.forEach((value) => {
      img_upload.append('file', value);
    });
    this.srv.loading();
    if (img_upload.get('file')  === null) {
       this.mOrderSrv.mineOrdReturn(this.orderRefund).subscribe(
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
        if (val.status === 200) {
          return this.mOrderSrv.mineOrdReturn(this.orderRefund);
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
