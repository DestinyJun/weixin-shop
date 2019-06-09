import {Component, Input, OnInit} from '@angular/core';
import {TabService} from '../../common/services/tab.service';
import {NavigationEnd, Router} from '@angular/router';
import {SwiperConfigInterface, SwiperPaginationInterface} from 'ngx-swiper-wrapper';
@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less']
})
export class TabHomeComponent implements OnInit {
  public tabUserInfo: any = null;
  // swoper
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };
  @Input() public config: SwiperConfigInterface = {
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
  public slides: any = null;
  constructor(
    private tabSrv: TabService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tabHomeInit();
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/tab/home') {
            this.config = {
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
          }
        }
      }
    );
  }
  public tabHomeInit(): void {
    this.tabSrv.tabGetUserInfo().subscribe(
      (val) => {
        if (val.status === 200) {
          console.log(val);
          this.tabUserInfo = val.data;
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
    this.tabSrv.tabGetBanner().subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          this.slides = val.datas;
          console.log(this.slides);
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
  public onIndexChange(index: number): void {
    // console.log('Swiper index: ', index);
  }
  public onSwiperEvent(event: string): void {
    // console.log(event);
    // console.log('Swiper event: ', event);
  }
}
