import {Component, OnInit} from '@angular/core';
import {TabService} from '../../common/services/tab.service';
import {NavigationEnd, Router} from '@angular/router';
import {SwiperPaginationInterface} from 'ngx-swiper-wrapper';
@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.less']
})
export class TabHomeComponent implements OnInit {
  public tabUserInfo: any = null;
  public tabHomeGreetings: any = null;
  public tabHomeDate = new Date().getHours();
  // swoper
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };
  public tabHomeConfig: any = null;
  public tabHomeSlides: any = null;
  constructor(
    private tabSrv: TabService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tabHomeInit();
    this.tabHomeTimer();
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/tab/home') {
            this.tabHomeConfig = {
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
        if (val.status === 200) {
          this.tabHomeSlides = val.datas;
          this.tabHomeConfig = {
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
  // time
  public tabHomeTimer(): void {
    if (this.tabHomeDate < 6) {
      this.tabHomeGreetings = '凌晨好！';
      return;
    }
    if (this.tabHomeDate < 9) {
      this.tabHomeGreetings = '早上好！';
      return;
    }
    if (this.tabHomeDate < 12) {
      this.tabHomeGreetings = '上午好！';
      return;
    }
    if (this.tabHomeDate < 14) {
      this.tabHomeGreetings = '中午好！';
      return;
    }
    if (this.tabHomeDate < 17) {
      this.tabHomeGreetings = '下午好！';
      return;
    }
    if (this.tabHomeDate < 19) {
      this.tabHomeGreetings = '傍晚好！';
      return;
    }
    if (this.tabHomeDate < 22) {
      this.tabHomeGreetings = '晚上好！';
      return;
    }
    this.tabHomeGreetings = '夜深了！';
  }
}
