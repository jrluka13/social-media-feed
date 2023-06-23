import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ValidationService } from '../../../../shared/services/validation.service';
import { ValidationServiceStub } from '../../../../../../tests/stubs/validation-service';
import { UsersService } from '../../../../shared/login/services/users.service';
import { UsersServiceStub } from '../../../../../../tests/stubs/users-service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationServiceStub } from '../../../../../../tests/stubs/notification-service';
import { StorageService } from '../../../../shared/services/storage.service';
import { StorageServiceStub } from '../../../../../../tests/stubs/storage-service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: ValidationService, useClass: ValidationServiceStub },
        {
          provide: UsersService,
          useClass: UsersServiceStub,
        },
        { provide: StorageService, useClass: StorageServiceStub },
        {
          provide: NotificationService,
          useClass: NotificationServiceStub,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
