import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, Input, OnDestroy,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { ERoutePath } from '../../../enums/route-path.enum';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
import { IPost } from '../../interfaces/post.interface';
import { AuthService } from '../../../login/services/auth.service';
import { UsersService } from '../../../login/services/users.service';
import { StorageService } from '../../../services/storage.service';
import {Subject} from "rxjs";
import {EIcon} from "../../../enums/icon.enum";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnDestroy{
  @Input() isFriendsRouteActive: boolean = false;

  public readonly ERoutePath = ERoutePath;

  public readonly EIcon = EIcon;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() dialogClose: EventEmitter<IPost | boolean> = new EventEmitter<
    IPost | boolean
  >();
  @Output() navigateToFriendsRoute: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() navigateToMainRoute: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _userService: UsersService,
    private readonly _storageService: StorageService,
    private readonly _matDialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public async navigateTo(pathName: ERoutePath): Promise<void> {
    this.navigateToFriendsRoute.emit();
    await this._router.navigate([ERoutePath.MAIN, pathName]);
  }

  public async navigateToMain(): Promise<void> {
    this.navigateToMainRoute.emit();
    await this._router.navigate([ERoutePath.MAIN]);
  }

  public async logout(): Promise<void> {
    await this._authService.logout();
    await this._router.navigate([ERoutePath.ROOT]);
  }

  public openCreateDialog(): void {
    const dialogRef = this._matDialog.open(CreatePostDialogComponent);
    dialogRef
      .afterClosed()
      .subscribe((isClosed) => this.dialogClose.emit(isClosed));
  }
}
