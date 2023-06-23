import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { AuthContainerModule } from '../../../../shared/login/components/auth-container/auth-container.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../../../shared/services/storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../shared/login/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {ValidationService} from "../../../../shared/services/validation.service";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    AuthContainerModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [StorageService, AuthService, ValidationService],
})
export class SignupModule {}
