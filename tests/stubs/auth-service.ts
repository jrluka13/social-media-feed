import {of} from "rxjs";

import createSpy = jasmine.createSpy;
export class AuthServiceStub {
  signUp = createSpy().and.returnValue(of());

  logout = createSpy();

}
