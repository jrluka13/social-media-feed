import { NgModule } from '@angular/core';
import { CreatePostDialogComponent } from './create-post-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PostApiService } from '../../services/post-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../services/storage.service';
import { ValidationService } from '../../../services/validation.service';

@NgModule({
  declarations: [CreatePostDialogComponent],
  exports: [CreatePostDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [PostApiService, StorageService, ValidationService],
})
export class CreatePostDialogModule {}
