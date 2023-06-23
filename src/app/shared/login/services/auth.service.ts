import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../constants/endpoints.constant';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { USER_KEY } from '../../constants/storage.constant';
import { StorageService } from '../../services/storage.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly _storageService: StorageService
  ) {}

  public signUp(user: IUser): Observable<void> {
    return this.http.post<void>(Endpoints.USERS.users, user);
  }

  public logout(): void {
    this._storageService.removeItem(USER_KEY);
  }
}
