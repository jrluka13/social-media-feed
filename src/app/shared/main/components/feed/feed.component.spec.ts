import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedComponent } from './feed.component';
import { PostApiService } from '../../services/post-api.service';
import { PostApiServiceStub } from '../../../../../../tests/stubs/post-api-service';
import { StorageService } from '../../../services/storage.service';
import { StorageServiceStub } from '../../../../../../tests/stubs/storage-service';
import { MatDialogModule } from '@angular/material/dialog';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: PostApiService, useClass: PostApiServiceStub },
        { provide: StorageService, useClass: StorageServiceStub },
      ],
    });
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
