import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthContainer } from './auth-container';

@NgModule({
  declarations: [AuthContainer],
  imports: [CommonModule],
  exports: [AuthContainer],
})
export class AuthContainerModule {}
