import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable()
export class LoginService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  users: User[] = [
    new User('test1@test.test', 'Test1234!'),
    new User('test2@test.text', 'Test1234!'),
  ];

  // login(email: string, passwd: string) {
  //   console.log(email, passwd);
  //   const user = this.users.find((user) => user.email === email);
  //   if (user && user.passwd === passwd) {
  //     sessionStorage.setItem('authToken', 'token');
  //     this._router.navigate(['']);
  //     return true;
  //   }
  //   return false;
  // }

  logout() {
    sessionStorage.removeItem('authToken');
    this._router.navigate(['login']);
  }

  login(email: string, passwd: string) {
    this._httpClient
      .post('http://localhost:3000/api/login', {
        email,
        passwd,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.token) {
          sessionStorage.setItem('authToken', res.token);
          return true;
          // this._router.navigate(['']);
        }
        return false;
      });
  }
}
