import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationService } from '../../../../shared/services/validation.service';
import { ValidationServiceStub } from '../../../../../../tests/stubs/validation-service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationServiceStub } from '../../../../../../tests/stubs/notification-service';
import {SignupComponent} from "./signup.component";
import {AuthService} from "../../../../shared/login/services/auth.service";
import {AuthServiceStub} from "../../../../../../tests/stubs/auth-service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: NotificationService,
          useClass: NotificationServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
