import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Endpoints} from "../../constants/endpoints.constant";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/user.interface";

@Injectable()
export class UsersService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(Endpoints.USERS.users);
  }

  public getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(Endpoints.USERS.byId(id));
  }

  public updateUser(id: string, user: IUser): Observable<void> {
    return this.http.patch<void>(Endpoints.USERS.byId(id), user);
  }


}
