import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  constructor() {}

  getToken() {
    return sessionStorage.getItem('authToken');
  }

  setToken(token: string) {
    sessionStorage.setItem('authToken', token);
  }
}
