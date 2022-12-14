import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { UnAuthorized } from 'src/app/common/app-unAuthorizedError';
import { UserTokenService } from '../userToken/user-token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  constructor(
    private _httpClient: HttpClient,
    private _userToken: UserTokenService
  ) {}

  login(email: string, passwd: string) {
    return this._httpClient
      .post(environment.apiUrl + 'login', {
        email,
        passwd,
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          this._userToken.setToken(response);
        }),
        catchError((error: Response) => {
          return this.handleError(error);
        })
      );
  }

  private handleError(error: Response) {
    switch (error.status) {
      case 404:
        return throwError(() => new NotFoundError(error));
      case 401:
        return throwError(() => new UnAuthorized(error));
      case 400:
        return throwError(() => new BadGatewayError(error));
      default:
        return throwError(() => new AppError(error));
    }
  }
}
