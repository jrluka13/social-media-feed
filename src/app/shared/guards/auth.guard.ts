import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ERoutePath} from "../enums/route-path.enum";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private readonly _router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('user');

    if (user) {
      return true;
    }

    this._router.navigate([ERoutePath.AUTH, ERoutePath.LOGIN]);

    return false;
  }
}
