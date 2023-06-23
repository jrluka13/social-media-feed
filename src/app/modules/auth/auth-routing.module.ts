import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERoutePath } from '../../shared/enums/route-path.enum';

const routes: Routes = [
  {
    path: ERoutePath.ROOT,
    pathMatch: 'full',
    redirectTo: ERoutePath.LOGIN,
  },
  {
    path: ERoutePath.ROOT,
    children: [
      {
        path: ERoutePath.LOGIN,
        loadChildren: () =>
          import('./pages/login/login.module').then(
            ({ LoginModule }) => LoginModule
          ),
      },
      {
        path: ERoutePath.SIGNUP,
        loadChildren: () =>
          import('./pages/signup/signup.module').then(
            ({ SignupModule }) => SignupModule
          ),
      },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
