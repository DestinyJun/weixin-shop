import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // 重写console.log，避免忘记注释产生信息泄露
  /*window.console.log = function () {};
  window.console.info = function () {};
  window.console.warn = function () {};
  window.console.error = function () {};
  window.console.debug = function () {};*/
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
