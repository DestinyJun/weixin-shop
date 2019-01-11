import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisteredReferrerComponent} from './registered-referrer/registered-referrer.component';
import {RegisteredSubmitComponent} from './registered-submit/registered-submit.component';
const registeredRoutes: Routes = [
  {path: '', redirectTo: 'referrer', pathMatch: 'full'},
  {path: 'referrer', component: RegisteredReferrerComponent},
  {path: 'submit', component: RegisteredSubmitComponent},
];
@NgModule({
  imports: [RouterModule.forChild(registeredRoutes)],
  exports: [RouterModule]
})
export class RegisteredRoutingModule {}
