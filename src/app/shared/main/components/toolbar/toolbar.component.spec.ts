import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { AuthServiceStub } from '../../../../../../tests/stubs/auth-service';
import { AuthService } from '../../../login/services/auth.service';
import { UsersService } from '../../../login/services/users.service';
import { UsersServiceStub } from '../../../../../../tests/stubs/users-service';
import { StorageServiceStub } from '../../../../../../tests/stubs/storage-service';
import { StorageService } from '../../../services/storage.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: UsersService,
          useClass: UsersServiceStub,
        },
        { provide: StorageService, useClass: StorageServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
