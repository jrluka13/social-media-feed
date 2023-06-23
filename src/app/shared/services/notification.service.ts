import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {DURATION, END_POSITION, TOP_POSITION} from "../constants/notification.constant";

@Injectable()
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  public show(message: string, action: string, className: string): void {
    this.openSnackBar(message, action, className);
  }

  private openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = DURATION
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
      verticalPosition: TOP_POSITION,
      horizontalPosition: END_POSITION
    });
  }
}
