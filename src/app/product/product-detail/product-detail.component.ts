import {Component, Input, OnInit} from '@angular/core';
import {SwiperConfigInterface, SwiperPaginationInterface} from 'ngx-swiper-wrapper';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {ProductService} from '../../common/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '八宝五胆墨药',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      icon: ''
    }
  };
  // swiper
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };
  public config: SwiperConfigInterface = {
    a11y: true,
    loop: true,
    threshold: 1,
    effect: 'coverflow',
    watchSlidesProgress: true,
    spaceBetween : 0,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: this.pagination,
    speed: 3000,
    observer: true,
    autoplay: {
      delay: 2000, // 时间 毫秒
      disableOnInteraction: false  // 用户操作之后是否停止自动轮播默认true
    }
  };
 /* public slides = [
    './assets/images/timg1.jpg',
    './assets/images/timg2.jpg',
    './assets/images/timg3.jpg',
  ];*/
  public prodInfo: any = null;
  public slides: any = null;
  // scroll
  public clientloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  constructor(
    private productSrv: ProductService,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productInit();
  }
  public productInit(): void {
    this.routerInfo.queryParams.subscribe(
      (prop) => {
        this.productSrv.prodGetInfo(prop).subscribe(
          (val) => {
            console.log(val);
            if (val.status === 200) {
              this.prodInfo = val.data;
              this.slides = val.data.imgs.split(',');
              return;
            }
            this.router.navigate(['/error'], {
              queryParams: {
                msg: `获取用户信息失败，错误码${val.status}`,
                url: null,
                btn: '请重试',
              }
            });
          }
        );
      }
    );
  }
  // scroll
  public clientLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
  // swiper
  public onIndexChange(index: number): void {
    // console.log('Swiper index: ', index);
  }
  public onSwiperEvent(event: string): void {
    // console.log(event);
    // console.log('Swiper event: ', event);
  }
}
