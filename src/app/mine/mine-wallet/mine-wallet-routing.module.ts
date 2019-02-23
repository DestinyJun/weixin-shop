import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineWalletComponent} from './mine-wallet.component';
import {WalletBalapayComponent} from './wallet-balapay/wallet-balapay.component';
import {WalletRechargeComponent} from './wallet-recharge/wallet-recharge.component';
const tabRoutes: Routes = [
  {path: '', component: MineWalletComponent},
  {path: 'balapay', component: WalletBalapayComponent},
  {path: 'recharge', component: WalletRechargeComponent},
  {path: 'success', component: WalletRechargeComponent},
];
@NgModule({
  imports: [RouterModule.forChild(tabRoutes)],
  exports: [RouterModule]
})
export class MineWalletRoutingModule {}
