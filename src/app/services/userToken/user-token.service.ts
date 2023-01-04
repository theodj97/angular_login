import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  constructor() {
    if (this.getToken()) {
      this.setToken(this.getToken()!);
    }
  }

  private httpOptions?: { headers: HttpHeaders };

  private getToken() {
    return sessionStorage.getItem('authToken');
  }

  getHeader() {
    return this.httpOptions;
  }

  setToken(token: string) {
    sessionStorage.setItem('authToken', token);
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
      }),
    };
  }

  removeToken() {
    sessionStorage.removeItem('authToken');
  }

  tokenExist() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
