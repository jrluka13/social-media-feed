import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERoutePath } from '../../../../shared/enums/route-path.enum';
import {SignupComponent} from "./signup.component";

const routes: Routes = [
  {
    path: ERoutePath.ROOT,
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
