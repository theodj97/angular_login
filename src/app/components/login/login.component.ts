import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { LoginService } from 'src/app/services/login/login.service';
import { PasswdHashService } from 'src/app/services/passwdHash/passwd-hash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _passwdHash: PasswdHashService
  ) {}

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
  loginError?: boolean;
  formGatewayError?: boolean;
  loading: boolean = false;
  passwdVisible: boolean = false;

  get email() {
    return this.loginForm.get('email');
  }

  get passwd() {
    return this.loginForm.get('passwd');
  }

  async login() {
    this.loading = true;
    this._loginService
      .login(
        this.email!.value!,
        await this._passwdHash.hashPassword(this.passwd!.value!)
      )
      .subscribe({
        complete: () => {
          this._router.navigate(['']);
        },
        error: (error: AppError) => {
          this.loading = false;
          this.validLogin = false;
          if (error instanceof NotFoundError) {
            this.loginError = true;
          } else if (error instanceof BadGatewayError) {
            // Formulario no válido
            this.formGatewayError = true;
          } else throw error;
        },
      });
  }
}

const passwordPattern =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
