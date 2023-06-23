import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

export class PostApiServiceStub {
  addPost = createSpy();
  updatePost = createSpy();
  getAllPosts = createSpy().and.returnValue(of([]));
  getPostById = createSpy().and.returnValue(of({}));
}
