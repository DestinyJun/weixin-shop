import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MineWalletComponent} from './mine-wallet.component';
import {MineWalletRoutingModule} from './mine-wallet-routing.module';
import {HeaderModule} from '../../common/components/header/header.module';
import { WalletBalapayComponent } from './wallet-balapay/wallet-balapay.component';
import { WalletRechargeComponent } from './wallet-recharge/wallet-recharge.component';
import { WalletSuccessComponent } from './wallet-success/wallet-success.component';
import { WalletWithdrawalComponent } from './wallet-withdrawal/wallet-withdrawal.component';

@NgModule({
  declarations: [
    MineWalletComponent,
    WalletBalapayComponent,
    WalletRechargeComponent,
    WalletSuccessComponent,
    WalletWithdrawalComponent
  ],
  imports: [
    CommonModule,
    MineWalletRoutingModule,
    HeaderModule,
  ]
})
export class MineWalletModule { }
