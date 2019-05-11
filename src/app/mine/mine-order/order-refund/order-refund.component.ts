import {Component, Input, OnInit} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {InfiniteLoaderConfig, Uploader, UploaderOptions} from 'ngx-weui';
import {Observable} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute} from '@angular/router';
const img_upload: FormData = new FormData();
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
  ordAftScrollConfig: InfiniteLoaderConfig = {
    height: 'auto'
  };
  // details
  public detailsData: any = null;
  public orderRefund: any = {};
  public orderRefundRemark: any = null;
  // upload
  @Input() url = 'example';
  public img: any;
  public imgShow = false;
  public uploader: Uploader = new Uploader(<UploaderOptions>{
    url: './upload.php',
    headers: [
      {name: 'auth', value: 'test'}
    ],
    params: {
      a: 1,
      b: new Date(),
      c: 'test',
      d: 12.123
    },
    // 自定义transport
    // uploadTransport: function(item: FileItem) {
    //     return Observable.create(observer => {
    //         setTimeout(() => {
    //             observer.next(true);
    //             observer.complete();
    //         }, 1000 * 3);
    //     });
    // },
    onFileQueued: function () {
      console.log(arguments);
      if (arguments) {
        for (let i = 0; i < arguments.length; i++) {
          img_upload.append('file', arguments[i].file);
        }
      }
    },
    onFileDequeued: function () {
      console.log('onFileDequeued', arguments);
    },
    onStart: function () {
      console.log('onStart', arguments);
    },
    onCancel: function () {
      console.log('onCancel', arguments);
    },
    onFinished: function () {
      console.log('onFinished', arguments);
    },
    onUploadStart: function () {
      console.log('onUploadStart', arguments);
    },
    onUploadProgress: function () {
      console.log('onUploadProgress', arguments);
    },
    onUploadSuccess: function () {
      console.log('onUploadSuccess', arguments);
    },
    onUploadError: function () {
      console.log('onUploadError', arguments);
    },
    onUploadComplete: function () {
      console.log('onUploadComplete', arguments);
    },
    onUploadCancel: function () {
      console.log('onUploadCancel', arguments);
    },
    onError: function () {
      console.log('onError', arguments);
    }
  });
  constructor(
    private mOrderSrv: MineOrderService,
    private routerInfo: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.routerInfo.params.subscribe((params) => {
      console.log(params);
      this.mineOrdRefundInit(params.id);
      this.orderRefund.orderId = params.id;
      this.orderRefund.refundType = params.type;
    });
  }

  public mineOrdRefundInit(id): void {
     this.mOrderSrv.mineOrdGetDetail({orderId: id}).subscribe(
       (val) => {
         console.log(val);
         if (val.status === 200) {
           this.detailsData = val;
           this.orderRefund.refundamount = val.data.amount;
         }
       }
     );
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
  // ngmodule
  public orderRefundRemarkChange(event): void {
    this.orderRefund.refundRemark = event;
  }
  public ordRefSubClick() {
    console.log(img_upload.get('file'));
    this.mOrderSrv.mineOrdImgUpload(img_upload).subscribe(
      (val) => {
        console.log(val);
      }
    );
   /* this.mOrderSrv.mineOrdReturn(this.orderRefund).subscribe(
      (val) => {
        console.log(val);
      }
    );*/
    // this.uploader.uploadAll();
  }
  public onChange(e): void {
    console.log(e);
  }
}
