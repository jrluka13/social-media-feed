import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EFriend } from '../../../../shared/main/enums/friend.enum';
import { EIcon } from '../../../../shared/enums/icon.enum';
import { UsersService } from '../../../../shared/login/services/users.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { IUser } from '../../../../shared/login/interfaces/user.interface';
import { USER_KEY } from '../../../../shared/constants/storage.constant';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { UsersUtils } from '../../../../shared/utils/users.utils';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ENotificationMessage } from '../../../../shared/enums/notification-message.enum';
import {
  ERROR,
  SUCCESS,
} from '../../../../shared/constants/notification.constant';
import {ValidationService} from "../../../../shared/services/validation.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public form: FormGroup;

  public users: IUser[];

  public readonly EFriend = EFriend;

  public readonly EIcon = EIcon;

  private userId: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private _currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(
    null
  );

  constructor(
    protected readonly _validationService: ValidationService,
    private readonly _usersService: UsersService,
    private readonly _storageService: StorageService,
    private readonly _formBuilder: FormBuilder,
    private readonly _notificationService: NotificationService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    super(_validationService);
  }

  get friendsQuantity(): number {
    return this._currentUser.getValue()?.friends?.length || 0;
  }

  get friends(): IUser[] {
    return this._currentUser.getValue()?.friends;
  }

  ngOnInit(): void {
    this.userId = this._storageService.getItem<IUser>(USER_KEY)?.id;

    this.getAllUsers();
    this.getCurrentUser();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public addFriend(): void {
    const newFriendName = this.form?.value.name;
    const currentUserName = this._currentUser.getValue().name;

    if (newFriendName === currentUserName) {
      this.checkOnIsACurrentUser();
    } else {
      const newFriend = this.users?.find((user) => user.name === newFriendName);
      const isNewFriendExitsInUser = this._currentUser
        .getValue()
        ?.friends?.some((user) => user.name === newFriendName);

      if (isNewFriendExitsInUser) {
        this.checkOnIsNewFriendExist();
      } else {
        if (newFriend) {
          this.checkOnIsNewFriendNotExist(newFriend);
        } else {
          this.checkOnIsUserNotExist();
        }
      }
    }

    this.getControl(EFriend.NAME).setValue(null);
  }

  private buildForm(): void {
    this.form = this._formBuilder.group({
      [EFriend.NAME]: new FormControl(null),
    });
  }

  private getCurrentUser(): void {
    this._usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: IUser) => {
          this._currentUser.next(user);
          this._changeDetectorRef.markForCheck();
        },
      });
  }

  private getAllUsers(): void {
    this._usersService
      .getAllUsers()
      .pipe(
        takeUntil(this.destroy$),
        map((users) => UsersUtils.transformUsersResponse(users))
      )
      .subscribe({ next: (users: IUser[]) => (this.users = users) });
  }

  private checkOnIsACurrentUser(): void {
    this._notificationService.show(
      ENotificationMessage.ERROR_ADD_SELF,
      '',
      ERROR
    );
  }

  private checkOnIsNewFriendExist(): void {
    this._notificationService.show(
      ENotificationMessage.ERROR_ADD_EXISTING_USER,
      '',
      ERROR
    );
  }

  private checkOnIsUserNotExist(): void {
    this._notificationService.show(
      ENotificationMessage.ERROR_ADD_UNKNOWN_USER,
      '',
      ERROR
    );
  }

  private checkOnIsNewFriendNotExist(newFriend: IUser): void {
    this._usersService
      .updateUser(this.userId, {
        friends: [...(this._currentUser.getValue()?.friends || []), newFriend],
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._notificationService.show(
            ENotificationMessage.SUCCESS_ADD_USER,
            '',
            SUCCESS
          );
          this.getCurrentUser();
        },
      });
  }
}
