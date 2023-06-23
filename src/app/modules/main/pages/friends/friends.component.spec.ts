import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsComponent } from './friends.component';
import { ValidationService } from '../../../../shared/services/validation.service';
import { ValidationServiceStub } from '../../../../../../tests/stubs/validation-service';
import { UsersService } from '../../../../shared/login/services/users.service';
import { UsersServiceStub } from '../../../../../../tests/stubs/users-service';
import { StorageService } from '../../../../shared/services/storage.service';
import { StorageServiceStub } from '../../../../../../tests/stubs/storage-service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationServiceStub } from '../../../../../../tests/stubs/notification-service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsComponent],
      providers: [
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: UsersService, useClass: UsersServiceStub },
        { provide: StorageService, useClass: StorageServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
