import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../../../shared/login/services/users.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ValidationService } from '../../../../shared/services/validation.service';

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    UsersService,
    StorageService,
    NotificationService,
    ValidationService,
  ],
})
export class FriendsModule {}
