import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarModule } from '../../shared/main/components/toolbar/toolbar.module';
import { FeedModule } from '../../shared/main/components/feed/feed.module';
import { StorageService } from '../../shared/services/storage.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UsersService } from '../../shared/login/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    ToolbarModule,
    FeedModule,
    InfiniteScrollModule,
  ],
  providers: [StorageService, UsersService, NotificationService],
})
export class MainModule {}
