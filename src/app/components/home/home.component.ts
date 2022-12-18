import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { UserBooksService } from 'src/app/services/userBooks/user-books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _userBook: UserBooksService, private _router: Router) {}

  ngOnInit(): void {
    console.log(
      this._userBook.getBooks().subscribe({
        complete: () => {},
        error: (error: AppError) => {
          if (error instanceof NotFoundError) {
          } else if (error instanceof BadGatewayError) {
          } else throw error;
        },
      })
    );
  }
}
