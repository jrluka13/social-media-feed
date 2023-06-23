import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {
  HttpErrorResponse,
} from '@angular/common/http';
import { NotificationService } from './notification.service';
import {ERROR} from "../constants/notification.constant";

@Injectable()
export class GlobalHttpErrorHandler implements ErrorHandler {
  constructor(private readonly _notificationService: NotificationService, private readonly _zone: NgZone) {}

  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    }

    this._zone.run(() => {
      const message = this.buildMessage(error);

      this._notificationService.show(message, '', ERROR);
    })
  }

  private buildMessage(data: HttpErrorResponse): string {
    const noDetailsMessage = 'no details provided';
    const noIdMessage = 'not provided';

    const message = data.error?.defaultMessage || data.message || noDetailsMessage;
    const correlationId = data.error?.correlationIdShort || noIdMessage;

    return `Message: ${message}; Correlation ID: ${correlationId}`;
  }
}


