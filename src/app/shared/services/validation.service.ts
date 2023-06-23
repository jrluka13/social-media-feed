import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {EValidationErrorType} from "../enums/validation-error-type.enum";
import {EValidationErrorMessage} from "../enums/validation-error-message.enum";

@Injectable()
export class ValidationService {

  public getValidationMessage(
    control: FormControl,
    controlLabel: string,
  ): string {
    const controlErrors = control.errors;

    if (!controlErrors) {
      return '';
    }

    if (EValidationErrorType.EMAIL in controlErrors) {
      return EValidationErrorMessage.EMAIL;
    }

    if (EValidationErrorType.REQUIRED in controlErrors) {
      return `${EValidationErrorMessage.REQUIRED} ${controlLabel}`;
    }

    return 'error unspecified';
  }
}
