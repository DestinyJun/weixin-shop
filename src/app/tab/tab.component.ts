import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HeaderContent} from '../common/components/header/header.model';
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
           this.rouStatus = event.urlAfterRedirects.slice(-5);
           this.tabActive = event.urlAfterRedirects.slice(5, 11);
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
  public onSelect(name): void {
    this.router.navigate([`/tab/${name}`]);
    if (name === 'home') {
      this.titleServices.setTitle('首页');
      return;
    }
    if (name === 'client') {
      this.titleServices.setTitle('客户');
      return;
    }
    if (name === 'mine') {
      this.titleServices.setTitle('我的');
      return;
    }
  }


}
