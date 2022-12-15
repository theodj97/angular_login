import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _loginService: LoginService, private _router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.email,
    ]),
    passwd: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern(passwordPattern),
    ]),
  });

  validLogin?: boolean;

  get email() {
    return this.loginForm.get('email');
  }

  get passwd() {
    return this.loginForm.get('passwd');
  }

  login() {
    console.log(
      this._loginService.login(this.email!.value!, this.passwd!.value!)
    );
  }
}

const passwordPattern =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
