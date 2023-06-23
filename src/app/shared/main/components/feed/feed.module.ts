import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostApiService } from '../../services/post-api.service';
import { MatDialogModule } from '@angular/material/dialog';
import {CommentsDialogModule} from "../comments-dialog/comments-dialog.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommentsDialogModule,
    InfiniteScrollModule,
  ],
  providers: [PostApiService],
  exports: [FeedComponent],
})
export class FeedModule {}
