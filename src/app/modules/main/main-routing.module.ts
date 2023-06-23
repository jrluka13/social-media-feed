import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERoutePath } from '../../shared/enums/route-path.enum';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: ERoutePath.ROOT,
    component: MainComponent,
    children: [
      // {
      //   path: ERoutePath.ROOT,
      //   loadChildren: () =>
      //     import('./pages/feed/feed.module').then(
      //       ({ HomeModule }) => HomeModule
      //     ),
      // },
      // {
      //   path: ERoutePath.HOME,
      //   loadChildren: () =>
      //     import('./pages/feed/feed.module').then(
      //       ({ HomeModule }) => HomeModule
      //     ),
      // },
      {
        path: ERoutePath.FRIENDS,
        loadChildren: () =>
          import('./pages/friends/friends.module').then(
            ({ FriendsModule }) => FriendsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
