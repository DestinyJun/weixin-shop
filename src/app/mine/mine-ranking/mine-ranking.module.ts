import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineRankingRoutingModule } from './mine-ranking-routing.module';
import { MineRankingComponent } from './mine-ranking.component';
import {WeUiModule} from 'ngx-weui';
import {LoadingModule} from '../../common/components/loading/loading.module';
import {HeaderModule} from '../../common/components/header/header.module';

@NgModule({
  declarations: [MineRankingComponent],
  imports: [
    CommonModule,
    MineRankingRoutingModule,
    WeUiModule.forRoot(),
    LoadingModule,
    HeaderModule,
  ]
})
export class MineRankingModule { }
