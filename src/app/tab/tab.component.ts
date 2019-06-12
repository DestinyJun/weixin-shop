import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less']
})
export class TabComponent implements OnInit {
  public tabActive: string;
  public rouStatus: string = null;
  constructor(
    private router: Router,
  ) {
     router.events.subscribe(
       (event) => {
         if (event instanceof NavigationEnd) {
           this.tabActive = event.urlAfterRedirects.split('/')[2];
           this.rouStatus = event.urlAfterRedirects.split('/')[2];
         }
       }
     );
  }

  ngOnInit() {
    // 防止页面后退
    /*window.history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      window.history.pushState(null, null, document.URL);
    });*/
  }
  public onSelect(name, event): void {
    this.router.navigate([`/tab/${name}`]);
    if (name === 'home') {
      event.icon = `<img src=./assets/images/home-ac.png>`;
    }
    if (name === 'order') {
      event.icon = `<img src=./assets/images/order-ac.png>`;
      return;
    }
    if (name === 'product') {
      event.icon = `<img src=./assets/images/product-ac.png>`;
      return;
    }
    if (name === 'mine') {
      event.icon = `<img src=./assets/images/mine-ac.png>`;
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
