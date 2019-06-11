import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './common/services/auth.interceptor';
import { ErrorRemindComponent } from './error-remind/error-remind.component';
import { LoginComponent } from './login/login.component';
import {LoadingModule} from './common/components/loading/loading.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorRemindComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
