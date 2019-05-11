import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisteredReferrerComponent} from './registered-referrer/registered-referrer.component';
import {RegisteredSubmitComponent} from './registered-submit/registered-submit.component';
import {RegisteredSuccessComponent} from './registered-success/registered-success.component';
const registeredRoutes: Routes = [
  {path: '', component: RegisteredReferrerComponent},
  {path: 'submit', component: RegisteredSubmitComponent},
  {path: 'success', component: RegisteredSuccessComponent},
];
@NgModule({
  imports: [RouterModule.forChild(registeredRoutes)],
  exports: [RouterModule]
})
export class RegisteredRoutingModule {}
