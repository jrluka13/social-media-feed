import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationService } from '../../../services/validation.service';
import { ValidationServiceStub } from '../../../../../../tests/stubs/validation-service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';
import { StorageServiceStub } from '../../../../../../tests/stubs/storage-service';
import { PostApiService } from '../../services/post-api.service';
import { PostApiServiceStub } from '../../../../../../tests/stubs/post-api-service';
import { CommentsDialogComponent } from './comments-dialog.component';

describe('CommentsDialogComponent', () => {
  let component: CommentsDialogComponent;
  let fixture: ComponentFixture<CommentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsDialogComponent],
      imports: [],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: StorageService, useClass: StorageServiceStub },
        { provide: PostApiService, useClass: PostApiServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
