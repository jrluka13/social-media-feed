import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

export class UsersServiceStub {
  getAllUsers = createSpy().and.returnValue(of([]));

  getUserById = createSpy().and.returnValue(of({}));
  updateUser = createSpy().and.returnValue(of());
}
