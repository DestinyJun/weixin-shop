import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineWalletComponent} from './mine-wallet.component';
import {WalletBalapayComponent} from './wallet-balapay/wallet-balapay.component';
import {WalletRechargeComponent} from './wallet-recharge/wallet-recharge.component';
import {WalletSuccessComponent} from './wallet-success/wallet-success.component';
import {WalletWithdrawalComponent} from './wallet-withdrawal/wallet-withdrawal.component';
const tabRoutes: Routes = [
  {path: '', component: MineWalletComponent},
  {path: 'balapay', component: WalletBalapayComponent},
  {path: 'recharge', component: WalletRechargeComponent},
  {path: 'success', component: WalletSuccessComponent},
  {path: 'withdrawal', component: WalletWithdrawalComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineWalletRoutingModule {}
