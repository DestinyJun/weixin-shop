import { Component, OnInit } from '@angular/core';
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
  public tabHome: any = null;
  constructor(
    private router: Router,
    private location: Location,
    private titleServices: Title,
    private tabSrc: TabService
  ) {
     router.events.subscribe(
       (event) => {
         if (event instanceof NavigationEnd) {
           this.rouStatus = event.urlAfterRedirects.slice(-5);
           this.tabActive = event.urlAfterRedirects.slice(5, 11);
         }
       }
     );
  }

  ngOnInit() {
    forkJoin([this.tabSrc.tabGetPersonIncome({}), this.tabSrc.tabGetTeamTop({})]).subscribe(
      (res) => {
        if (res) {
          this.tabHome = res;
        } else {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: `获取数据失败，请检查网络后重试！`,
              url: null,
              btn: '请重试',
            }});
        }
      }
    );
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
    if (name === 'client') {
      event.icon = `<img src=./assets/images/client-ac.png>`;
      this.titleServices.setTitle('客户');
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
    if (event.heading === '客户') {
      event.icon = `<img src=./assets/images/client.png>`;
      return;
    }
    if (event.heading === '我的') {
      event.icon = `<img src=./assets/images/mine.png>`;
      return;
    }
  }
}
