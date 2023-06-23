import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../interfaces/post.interface';
import { Observable } from 'rxjs';
import { Endpoints } from '../../constants/endpoints.constant';

@Injectable()
export class PostApiService {
  constructor(private readonly http: HttpClient) {}

  public addPost(post: IPost): Observable<void> {
    return this.http.post<void>(Endpoints.POSTS.posts, post);
  }

  public getAllPosts(
    orderBy: string,
  ): Observable<IPost[]> {
    return this.http.get<IPost[]>(
      Endpoints.POSTS.postsWithOrder(orderBy)
    );
  }

  public getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(Endpoints.POSTS.byId(id));
  }

  public updatePost(id: string, post: IPost): Observable<void> {
    return this.http.patch<void>(Endpoints.POSTS.byId(id), post);
  }
}
