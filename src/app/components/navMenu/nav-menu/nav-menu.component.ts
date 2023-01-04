import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserTokenService } from 'src/app/services/userToken/user-token.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  constructor(
    private _userTokenService: UserTokenService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      console.log('entro');
      if (event instanceof NavigationEnd) {
        this.userLoggedIn = this._userTokenService.tokenExist();
      }
    });
  }
  userLoggedIn?: boolean;
}
