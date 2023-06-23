import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../../../shared/services/storage.service';
import { AuthContainerModule } from '../../../../shared/login/components/auth-container/auth-container.module';
import {UsersService} from "../../../../shared/login/services/users.service";
import {ValidationService} from "../../../../shared/services/validation.service";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthContainerModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [StorageService, UsersService, ValidationService],
})
export class LoginModule {}
