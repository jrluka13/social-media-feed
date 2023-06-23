import createSpy = jasmine.createSpy;

export class ValidationServiceStub {
  getValidationMessage = createSpy().and.returnValue('error unspecified');
}
