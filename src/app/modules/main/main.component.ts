import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { PostApiService } from '../../shared/main/services/post-api.service';
import { IPost } from '../../shared/main/interfaces/post.interface';
import { StorageService } from '../../shared/services/storage.service';
import { USER_KEY } from '../../shared/constants/storage.constant';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ERoutePath } from '../../shared/enums/route-path.enum';
import { IUser } from '../../shared/login/interfaces/user.interface';
import { UsersService } from '../../shared/login/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ENotificationMessage } from '../../shared/enums/notification-message.enum';
import { SUCCESS } from '../../shared/constants/notification.constant';

const ORDER_BY_KEY = 'createdDate';
const BATCH = 8;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  public posts$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);

  public isFriendsRouteActive: boolean = false;

  private allPosts$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>(
    []
  );

  private currentUserId: string;

  private lastIndex: number = 0;

  private isFinished: boolean = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private _currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(
    null
  );

  constructor(
    private readonly _router: Router,
    private readonly _postApiService: PostApiService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _storageService: StorageService,
    private readonly _usersService: UsersService,
    private readonly _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isFriendsRouteActive =
      _.last(this._router.url.split('/')) === ERoutePath.FRIENDS;
    this.currentUserId = this._storageService.getItem<IUser>(USER_KEY)?.id;
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public navigateToMainRoute(): void {
    this.isFriendsRouteActive = false;
    this.isFinished = false;
    this.lastIndex = 0;
    this.posts$.next([]);
    this.getCurrentUser();
  }

  public dialogClose(isClosed: boolean): void {
    if (isClosed) {
      this._notificationService.show(
        ENotificationMessage.SUCCESS_ADD_POST,
        '',
        SUCCESS
      );
    }
  }

  public likePost({ likes, id }: IPost): void {
    this._postApiService
      .updatePost(id, {
        likes: this.checkedIsCurrentUserLiked(likes),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  public onScroll(): void {
    if (!this.isFriendsRouteActive) {
      this.getFriendsPosts(
        this.allPosts$.getValue()?.splice(this.lastIndex, BATCH + 1)
      );
    }
  }

  private checkedIsCurrentUserLiked(likes: string[]): string[] {
    const isCurrentUserLiked = likes.some(
      (userId) => userId === this.currentUserId
    );

    if (isCurrentUserLiked) {
      const likeIndex = likes.findIndex(
        (userId) => userId === this.currentUserId
      );
      likes.splice(likeIndex, 1);
    } else {
      likes.push(this.currentUserId);
    }

    return likes;
  }

  private getCurrentUser(): void {
    this._usersService
      .getUserById(this.currentUserId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: IUser) => {
          this._currentUser.next(user);
          this.fetchAllPosts();
        },
      });
  }

  private fetchAllPosts(): void {
    this._postApiService
      .getAllPosts(ORDER_BY_KEY)
      .pipe(
        takeUntil(this.destroy$),
        map((res) => {
          const posts: IPost[] = [];

          this._currentUser.getValue()?.friends?.forEach((friend) => {
            for (const key in res) {
              if (res.hasOwnProperty(key) && res[key].author === friend.name)
                posts.push({
                  ...res[key],
                  id: key,
                  likes: res[key].likes ? res[key].likes : [],
                });
            }
          });

          return posts;
        })
      )
      .subscribe({
        next: (res) => {
          this.allPosts$.next(res.reverse());
          this.getFriendsPosts(
            this.allPosts$.getValue().slice(this.lastIndex, BATCH + 1)
          );
        },
      });
  }

  private getFriendsPosts(posts: IPost[]): void {
    if (this.isFinished) return;
    this.lastIndex = _.lastIndexOf(posts) - 1;
    const newPosts = _.slice(posts, 0, BATCH);
    const currentPosts = this.posts$.getValue();

    if (this.lastIndex === _.lastIndexOf(newPosts) - 1) {
      this.isFinished = true;
    }

    this.posts$.next(_.concat(currentPosts, newPosts));
  }
}
