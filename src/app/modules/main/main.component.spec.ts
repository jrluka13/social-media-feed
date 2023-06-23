import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { PostApiService } from '../../shared/main/services/post-api.service';
import { PostApiServiceStub } from '../../../../tests/stubs/post-api-service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../shared/services/storage.service';
import { StorageServiceStub } from '../../../../tests/stubs/storage-service';
import { UsersService } from '../../shared/login/services/users.service';
import { UsersServiceStub } from '../../../../tests/stubs/users-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { NotificationServiceStub } from '../../../../tests/stubs/notification-service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: PostApiService, useClas: PostApiServiceStub },
        { provide: StorageService, useClass: StorageServiceStub },
        { provide: UsersService, useClass: UsersServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
