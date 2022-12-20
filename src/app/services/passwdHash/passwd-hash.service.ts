import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswdHashService {
  constructor() {}

  async hashPassword(passwd: string) {
    const buffer = new TextEncoder().encode(passwd);
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashBase64 = window.btoa(String.fromCharCode.apply(null, hashArray));
    return hashBase64;
  }
}
