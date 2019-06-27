import {Component, OnInit, ViewChild} from '@angular/core';
import {SwiperPaginationInterface} from 'ngx-swiper-wrapper';
import {HeaderContent} from '../../common/components/header/header.model';
import {ProductService} from '../../common/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';

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
  public prodConfig: any = {};
  public prodInfo: any = null;
  public prodSlides: any = null;
  public prodHtml: any = null;
  // scroll
  public proScrollConfig: InfiniteLoaderConfig = {
    height: '100%',
    finished: ''
  };
  constructor(
    private productSrv: ProductService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.productInit();
  }
  public productInit(): void {
    this.routerInfo.queryParams.subscribe(
      (prop) => {
        this.productSrv.prodGetInfo(prop).subscribe(
          (val) => {
            if (val.status === 200) {
              this.prodInfo = val.data;
              this.prodHtml = this.sanitizer.bypassSecurityTrustHtml(val.data.content);
              this.prodSlides = val.data.imgs.split(',');
              this.prodConfig = {
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
              return;
            }
            this.router.navigate(['/error'], {
              queryParams: {
                msg: `获取信息失败，错误码${val.status}`,
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
  public onLoadMore(comp: InfiniteLoaderComponent): void {
    comp.setFinished();
  }
}
