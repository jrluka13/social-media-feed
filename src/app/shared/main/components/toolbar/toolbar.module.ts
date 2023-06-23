import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CreatePostDialogModule } from '../create-post-dialog/create-post-dialog.module';
import { StorageService } from '../../../services/storage.service';
import {AuthService} from "../../../login/services/auth.service";
import {UsersService} from "../../../login/services/users.service";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CreatePostDialogModule,
    NgIf,
  ],
  exports: [ToolbarComponent],
  providers: [AuthService, StorageService, UsersService],
})
export class ToolbarModule {}
