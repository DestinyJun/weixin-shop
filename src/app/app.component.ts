import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'weixin-shop';
  constructor( private router: Router,) {
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event.urlAfterRedirects);
        }
      }
    );
  }
}
