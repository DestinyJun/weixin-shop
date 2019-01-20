import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisteredReferrerComponent} from './registered-referrer/registered-referrer.component';
import {RegisteredSubmitComponent} from './registered-submit/registered-submit.component';
import {RegisteredCameraComponent} from './registered-camera/registered-camera.component';
const registeredRoutes: Routes = [
  // {path: '', redirectTo: '/registered/referrer', pathMatch: 'full'},
  {path: '', component: RegisteredReferrerComponent},
  {path: 'referrer', component: RegisteredReferrerComponent},
  {path: 'submit', component: RegisteredSubmitComponent},
  {path: 'camera', component: RegisteredCameraComponent},
];
@NgModule({
  imports: [RouterModule.forChild(registeredRoutes)],
  exports: [RouterModule]
})
export class RegisteredRoutingModule {}
