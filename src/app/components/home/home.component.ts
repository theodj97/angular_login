import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private _loginService: LoginService, private _router: Router) {}
  // token = sessionStorage.getItem('authToken');
  logOut() {
    this._loginService.logout();
    this._router.navigate(['login']);
  }
}
