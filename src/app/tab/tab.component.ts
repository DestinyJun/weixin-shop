import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HeaderContent} from '../common/components/header/header.model';
import {TabService} from '../common/services/tab.service';
import {forkJoin} from 'rxjs';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less']
})
export class TabComponent implements OnInit {
  public tabActive: string;
  public clientHeader: HeaderContent = {
    title: '客户',
    leftContent: {
      icon: ''
    },
    rightContent: {
      title: '新增',
      color: '#86B876'
    }
  };
  public rouStatus: string = null;
  constructor(
    private router: Router,
    private location: Location,
    private titleServices: Title,
  ) {
     router.events.subscribe(
       (event) => {
         if (event instanceof NavigationEnd) {
           // console.log(event);
           this.tabActive = event.urlAfterRedirects.split('/')[2];
           this.rouStatus = event.urlAfterRedirects.split('/')[2];
           // console.log(this.tabActive, this.rouStatus);
         }
       }
     );
  }

  ngOnInit() {
    this.titleServices.setTitle('首页');
    if (this.rouStatus === 'order') {
      this.clientHeader = {
        title: '请选择客户收货地址',
        leftContent: {
          icon: 'fa fa-chevron-left'
        },
        rightContent: {
          title: '新增',
          color: '#86B876'
        }
      };
    } else {
      this.clientHeader = {
        title: '客户',
        leftContent: {
          icon: ''
        },
        rightContent: {
          title: '新增',
          color: '#86B876'
        }
      };
    }
  }
  public onSelect(name, event): void {
    this.router.navigate([`/tab/${name}`]);
    if (name === 'home') {
      event.icon = `<img src=./assets/images/home-ac.png>`;
      this.titleServices.setTitle('首页');
    }
    if (name === 'order') {
      event.icon = `<img src=./assets/images/order-ac.png>`;
      this.titleServices.setTitle('商品预约');
      return;
    }
    if (name === 'product') {
      event.icon = `<img src=./assets/images/product-ac.png>`;
      this.titleServices.setTitle('产品知识');
      return;
    }
    if (name === 'mine') {
      event.icon = `<img src=./assets/images/mine-ac.png>`;
      this.titleServices.setTitle('我的');
      return;
    }
  }
  public onDeselect(event): void {
    if (event.heading === '首页') {
      event.icon = `<img src=./assets/images/home.png>`;
    }
    if (event.heading === '商品预约') {
      event.icon = `<img src=./assets/images/order.png>`;
      return;
    }
    if (event.heading === '产品知识') {
      event.icon = `<img src=./assets/images/product.png>`;
      return;
    }
    if (event.heading === '我的') {
      event.icon = `<img src=./assets/images/mine.png>`;
      return;
    }
  }
}
