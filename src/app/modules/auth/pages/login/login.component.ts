import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ELogin } from '../../../../shared/login/enums/login.enum';
import { Router } from '@angular/router';
import { ERoutePath } from '../../../../shared/enums/route-path.enum';
import { BaseComponent } from '../../../../shared/components/base-component/base.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import {
  ERROR,
  SUCCESS,
} from '../../../../shared/constants/notification.constant';
import { EInputType } from '../../../../shared/enums/input-type.enum';
import { EIcon } from '../../../../shared/enums/icon.enum';
import { UsersService } from '../../../../shared/login/services/users.service';
import { map, Subject, takeUntil } from 'rxjs';
import { IUser } from '../../../../shared/login/interfaces/user.interface';
import { StorageService } from '../../../../shared/services/storage.service';
import { USER_KEY } from '../../../../shared/constants/storage.constant';
import { ENotificationMessage } from '../../../../shared/enums/notification-message.enum';
import { UsersUtils } from '../../../../shared/utils/users.utils';
import {ValidationService} from "../../../../shared/services/validation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public readonly ELogin = ELogin;

  public isVisible: boolean = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected readonly _validationService: ValidationService,
    private readonly _formBuilder: FormBuilder,
    private readonly _usersService: UsersService,
    private readonly _router: Router,
    private readonly _notificationService: NotificationService,
    private readonly _storageService: StorageService
  ) {
    super(_validationService);
  }

  get type(): string {
    return this.isVisible ? EInputType.PASSWORD : EInputType.TEXT;
  }

  get passwordHideIcon(): string {
    return this.isVisible ? EIcon.VISIBILITY_OFF : EIcon.VISIBILITY;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public signIn(): void {
    this._usersService
      .getAllUsers()
      .pipe(
        takeUntil(this.destroy$),
        map((users) => UsersUtils.transformUsersResponse(users))
      )
      .subscribe({
        next: async (users) => {
          if (this.isEmailsMatched(users)) {
            if (this.isPasswordsMatched(users)) {
              this._notificationService.show(
                ENotificationMessage.SUCCESS_SIGN_IN,
                '',
                SUCCESS
              );
              this._storageService.setItem(USER_KEY, this.loggedUser(users));
              await this._router.navigate([ERoutePath.MAIN]);
            } else {
              this._notificationService.show(
                ENotificationMessage.ERROR_WRONG_PASSWORD,
                '',
                ERROR
              );
            }
          } else {
            this._notificationService.show(
              ENotificationMessage.ERROR_ADD_UNKNOWN_USER,
              '',
              ERROR
            );
          }
        },
      });
  }

  public async navigateToSignUp(): Promise<void> {
    await this._router.navigate([ERoutePath.AUTH, ERoutePath.SIGNUP]);
  }

  private buildForm(): void {
    this.form = this._formBuilder.group({
      [ELogin.EMAIL]: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      [ELogin.PASSWORD]: new FormControl(null, [Validators.required]),
    });
  }

  private isEmailsMatched(users: IUser[]): boolean {
    const { email } = this.form.value;

    return users.some((user) => user.email === email);
  }

  private isPasswordsMatched(users: IUser[]): boolean {
    const { password } = this.form.value;

    return users.some((user) => user.password === password);
  }

  private loggedUser(users: IUser[]): IUser {
    const { password, email } = this.form.value;

    return users.find(
      (user) => user.password === password && user.email === email
    );
  }
}
