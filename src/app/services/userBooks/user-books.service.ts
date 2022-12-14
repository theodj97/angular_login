import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { UnAuthorized } from 'src/app/common/app-unAuthorizedError';
import { environment } from 'src/environments/environment';
import { UserTokenService } from '../userToken/user-token.service';

@Injectable({
  providedIn: 'root',
})
export class UserBooksService {
  constructor(
    private _httpClient: HttpClient,
    private _userToken: UserTokenService
  ) {}

  getBooks() {
    return this._httpClient
      .get(environment.apiUrl + 'uBooks', this._userToken.getHeader())
      .pipe(
        map((response: any) => {
          return response;
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
