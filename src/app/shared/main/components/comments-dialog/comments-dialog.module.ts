import { NgModule } from '@angular/core';
import { CommentsDialogComponent } from './comments-dialog.component';
import { PostApiService } from '../../services/post-api.service';
import { StorageService } from '../../../services/storage.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ValidationService } from '../../../services/validation.service';

@NgModule({
  declarations: [CommentsDialogComponent],
  exports: [CommentsDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [PostApiService, StorageService, ValidationService],
})
export class CommentsDialogModule {}
