export class User {
  constructor(private _email: string, private _passwd: string) {}

  get email() {
    return this._email;
  }

  get passwd() {
    return this._passwd;
  }

  set email(email: string) {
    this._email = email;
  }

  set passwd(passwd: string) {
    this._passwd = passwd;
  }
}
