import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { UserBooksService } from 'src/app/services/userBooks/user-books.service';
import { DatePipe } from '@angular/common';
import { UserBook } from 'src/app/models/userbook';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _userBook: UserBooksService,
    private _datePipe: DatePipe,
    private _activatedRoute: ActivatedRoute
  ) {}
  bookList?: Array<UserBook>;
  bookListFiltered?: Array<UserBook>;

  ngOnInit(): void {
    this._userBook.getBooks().subscribe({
      next: (data: any) => {
        this.bookList = data;
      },
      complete: () => {
        this.bookList?.forEach((book) => {
          book.publication_date = this._datePipe.transform(
            book.publication_date,
            'dd/MM/yyyy'
          )!;
        });
        this.bookListFiltered = this.bookList;
        // Con este método obtengo los parámetros que se van añadiendo a la URL
        this._activatedRoute.queryParams.subscribe((params) => {
          if (params['genres']) {
            this.filterByGenre(JSON.parse(params['genres']));
          }
          if (params['orderBy']) {
            this.orderBy(Number(JSON.parse(params['orderBy'])));
          }
        });
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
        } else if (error instanceof BadGatewayError) {
        } else throw error;
      },
    });
  }

  filterByGenre(genres: Array<number>) {
    if (genres === undefined || genres.length === 0) {
      this.bookListFiltered = this.bookList;
    } else {
      this.bookListFiltered = this.bookList?.filter((book) =>
        genres.includes(book.genre)
      );
    }
  }

  orderBy(idOrder: number) {
    switch (idOrder) {
      case 1: {
        this.bookListFiltered = this.bookListFiltered?.sort((a, b) =>
          a.page_count < b.page_count ? 1 : -1
        );
        break;
      }
      case 2: {
        this.bookListFiltered = this.bookListFiltered?.sort((a, b) =>
          a.page_count > b.page_count ? 1 : -1
        );
        break;
      }
      case 3: {
        this.bookListFiltered = this.bookListFiltered?.sort((a, b) =>
          a.publication_date < b.publication_date ? 1 : -1
        );
        break;
      }
      case 4: {
        this.bookListFiltered = this.bookListFiltered?.sort((a, b) =>
          a.publication_date > b.publication_date ? 1 : -1
        );
        break;
      }
      case 5: {
        this.bookListFiltered = this.bookListFiltered?.sort((a, b) =>
          a.purchased < b.purchased ? 1 : -1
        );
        break;
      }
      case 6: {
        this.bookListFiltered = this.bookListFiltered?.sort((a, b) =>
          a.purchased > b.purchased ? 1 : -1
        );
        break;
      }
      default: {
        // Cambiar porque aquí coge la referencia y no el valor
        this.bookListFiltered = this.bookList;
        break;
      }
    }
  }
}
