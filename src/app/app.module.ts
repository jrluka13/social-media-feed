import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { environment } from '../assets/environments/environment';
import { NotificationService } from './shared/services/notification.service';
import {GlobalHttpErrorHandler} from "./shared/services/global-http-error-handler.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    AuthGuard,
    MatSnackBar,
    NotificationService,
    {
      provide: ErrorHandler,
      useClass: GlobalHttpErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
