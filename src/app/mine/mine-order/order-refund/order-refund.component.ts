import {Component, Input, OnInit} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {InfiniteLoaderConfig, Uploader, UploaderOptions} from 'ngx-weui';
import {Observable} from 'rxjs';
import {MineOrderService} from '../../../common/services/mine-order.service';
import {ActivatedRoute} from '@angular/router';

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
  public orderDetailsData: Observable<any>;
  // upload
  @Input() url = 'example';
  img: any;
  imgShow = false;
  uploader: Uploader = new Uploader(<UploaderOptions>{
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
      console.log('onFileQueued', arguments);
      if (arguments) {
        console.log(this);
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
    this.routerInfo.params.subscribe(params => this.mineOrdDetailInit(params.id));
  }

  public mineOrdDetailInit(id): void {
    this.orderDetailsData = this.mOrderSrv.mineOrdGetDetail({orderId: id});
  }
  public onGallery(item: any) {
    this.img = [{file: item._file, item: item}];
    this.imgShow = true;
  }
  public onDel(item: any) {
    console.log(item);
    this.uploader.removeFromQueue(item.item);
  }
  public ordRefSubClick() {
    this.uploader.uploadAll();
  }
}
