import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ESignup } from '../../../../shared/login/enums/signup.enum';
import { ERoutePath } from '../../../../shared/enums/route-path.enum';
import { EInputType } from '../../../../shared/enums/input-type.enum';
import { EIcon } from '../../../../shared/enums/icon.enum';
import { AuthService } from '../../../../shared/login/services/auth.service';
import { ENotificationMessage } from '../../../../shared/enums/notification-message.enum';
import { SUCCESS } from '../../../../shared/constants/notification.constant';
import { Subject, takeUntil } from 'rxjs';
import {ValidationService} from "../../../../shared/services/validation.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public form: FormGroup;

  public isVisible: boolean = false;

  public readonly ESignup = ESignup;

  public readonly EInputType = EInputType;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected readonly _validationService: ValidationService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _notificationService: NotificationService,
    private readonly _authService: AuthService
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

  private buildForm(): void {
    this.form = this._formBuilder.group({
      [ESignup.EMAIL]: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      [ESignup.PASSWORD]: new FormControl(null, [Validators.required]),
      [ESignup.NAME]: new FormControl(null, [Validators.required]),
      [ESignup.PHONE]: new FormControl(null, [Validators.required]),
      [ESignup.FRIENDS]: new FormControl([]),
    });
  }

  public async navigateToLogin(): Promise<void> {
    await this._router.navigate([ERoutePath.AUTH, ERoutePath.LOGIN]);
  }

  public signUp(): void {
    this._authService
      .signUp(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async () => {
          this._notificationService.show(
            ENotificationMessage.SUCCESS_SIGN_UP,
            '',
            SUCCESS
          );
          await this.navigateToLogin();
        },
      });
  }
}
