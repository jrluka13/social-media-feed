import {IUser} from "../login/interfaces/user.interface";

export class UsersUtils {
  static transformUsersResponse(response: IUser[]): IUser[] {
    const users: IUser[] = [];

    for (const key in response) {
      if (response.hasOwnProperty(key))
        users.push({
          ...response[key],
          id: key,
        });
    }

    return users;
  }
}
