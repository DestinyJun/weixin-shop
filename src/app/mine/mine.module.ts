import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { MineUserComponent } from './mine-user/mine-user.component';
import { MineSharedComponent } from './mine-shared/mine-shared.component';
import {MineRoutingModule} from './mine-routing.module';
import {HeaderModule} from '../common/components/header/header.module';
import {WeUiModule} from 'ngx-weui';
import { MineUserNameComponent } from './mine-user/mine-user-name/mine-user-name.component';
import {QRCodeModule} from 'angularx-qrcode';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MineUserComponent,
    MineSharedComponent,
    MineUserNameComponent
  ],
  imports: [
    CommonModule,
    MineRoutingModule,
    HeaderModule,
    WeUiModule.forRoot(),
    QRCodeModule,
    FormsModule,
  ],
  providers: [DatePipe]
})
export class MineModule { }
