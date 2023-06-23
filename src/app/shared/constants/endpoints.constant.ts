import { environment } from '../../../assets/environments/environment';

const GATEWAY = `${environment.api.url}`;

class Posts {
  static readonly posts = `${GATEWAY}/posts.json`;
  static readonly postsWithOrder = (orderBy: string) =>
    `${GATEWAY}/posts.json?orderBy="${orderBy}"`;

  static readonly byId = (id: string) => `${GATEWAY}/posts/${id}.json`;
}

class Friends {
  static readonly friends = `${GATEWAY}/friends.json`;
}

class Users {
  static readonly users = `${GATEWAY}/users.json`;

  static readonly byId = (id: string) => `${GATEWAY}/users/${id}.json`;
}

export class Endpoints {
  static readonly POSTS = Posts;

  static readonly FRIENDS = Friends;

  static readonly USERS = Users;
}
