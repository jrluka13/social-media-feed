import { FormControl, FormGroup } from '@angular/forms';
import {ValidationService} from "../../services/validation.service";

export abstract class BaseComponent {
  abstract form: FormGroup;

  protected constructor(protected readonly _validation: ValidationService) {
  }

  public getControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

  public getValidationMessage(controlName: string): string {
    const control = this.getControl(controlName);

    return this._validation.getValidationMessage(control, controlName);
  }
}
