import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PostApiService } from '../../services/post-api.service';
import { IPost } from '../../interfaces/post.interface';
import { IComment } from '../../interfaces/comment.interface';
import { StorageService } from '../../../services/storage.service';
import { USER_KEY } from '../../../constants/storage.constant';
import { MatDialog } from '@angular/material/dialog';
import { CommentsDialogComponent } from '../comments-dialog/comments-dialog.component';
import {IUser} from "../../../login/interfaces/user.interface";

const FAVORITE_ICON = 'favorite';
const FAVORITE_BORDER_ICON = 'favorite_border';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
  @Input() posts: IPost[] = [];

  @Output() likePost: EventEmitter<IPost> = new EventEmitter<IPost>();

  @Output() scroll: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly _postApiService: PostApiService,
    private readonly _storageService: StorageService,
    private readonly _matDialog: MatDialog,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  public getLikesQuantity(likes: string[]): string {
    return `${likes ? likes.length : 0} Likes`;
  }

  public getCommentsQuantity(comments: IComment[]): string {
    return `${comments ? comments.length : 0} Comments`;
  }

  public getLikedIcon({ likes }: IPost): string {
    const currentUserId = this._storageService.getItem<IUser>(USER_KEY).id;
    const isCurrentUserLiked = likes?.some(
      (userId) => userId === currentUserId
    );

    return isCurrentUserLiked ? FAVORITE_ICON : FAVORITE_BORDER_ICON;
  }

  public openCommentsDialog({ id }: IPost): void {
    const dialogRef = this._matDialog.open(CommentsDialogComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((comments) => {
      this.posts = this.posts.map((post) => {
        if (post.id === id && comments) {
          post.comments = [...comments];
        }

        return post;
      });

      this._changeDetectorRef.markForCheck();
    });
  }
}
