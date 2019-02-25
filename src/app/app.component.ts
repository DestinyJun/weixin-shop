import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'weixin-shop';
  constructor( private router: Router) {
    console.log(environment.env);
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event.urlAfterRedirects);
        }
      }
    );
  }
}
