import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationService } from '../../../services/validation.service';
import { ValidationServiceStub } from '../../../../../../tests/stubs/validation-service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CreatePostDialogComponent } from './create-post-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';
import { StorageServiceStub } from '../../../../../../tests/stubs/storage-service';
import { PostApiService } from '../../services/post-api.service';
import { PostApiServiceStub } from '../../../../../../tests/stubs/post-api-service';

describe('CreatePostDialogComponent', () => {
  let component: CreatePostDialogComponent;
  let fixture: ComponentFixture<CreatePostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePostDialogComponent],
      imports: [],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: StorageService, useClass: StorageServiceStub },
        { provide: PostApiService, useClass: PostApiServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CreatePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
