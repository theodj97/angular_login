import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private token = sessionStorage.getItem('authToken');

  constructor(private _router: Router) {
    if (this.token === null) {
      this._router.navigate(['/']);
    }
  }
}
