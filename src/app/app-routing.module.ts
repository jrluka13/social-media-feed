import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERoutePath } from './shared/enums/route-path.enum';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: ERoutePath.ROOT,
    pathMatch: 'full',
    redirectTo: ERoutePath.AUTH,
  },
  {
    path: ERoutePath.ROOT,
    children: [
      {
        path: ERoutePath.AUTH,
        loadChildren: () =>
          import('./modules/auth/auth.module').then(
            ({ AuthModule }) => AuthModule
          ),
      },
      {
        path: ERoutePath.MAIN,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/main/main.module').then(
            ({ MainModule }) => MainModule
          ),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ERoutePath.AUTH,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
