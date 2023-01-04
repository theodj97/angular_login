import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { UserBooksService } from 'src/app/services/userBooks/user-books.service';
import { DatePipe } from '@angular/common';
import { UserBook } from 'src/app/models/userbook';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
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
        // Con este método obtengo los parámetros que se van añadiendo a la URL
        this._activatedRoute.queryParams.subscribe((params) => {
          console.log('entro');
          this.filterBooks(params);
        });
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
        } else if (error instanceof BadGatewayError) {
        } else throw error;
      },
    });
  }

  private filterByGenre(genres: Array<number>) {
    this.bookListFiltered = this.bookListFiltered?.filter((book) =>
      genres.includes(book.genre)
    );
  }

  private orderBy(idOrder: number) {
    switch (idOrder) {
      case 1: {
        console.log('entro');
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
        this.bookListFiltered = this.bookListFiltered?.sort((a, b) =>
          a.id < b.id ? 1 : -1
        );
      }
    }
  }

  private filterByReaded(state: string) {
    switch (state) {
      case 'readed': {
        this.bookListFiltered = this.bookListFiltered?.filter(
          (book) => book.readed
        );
        break;
      }
      case 'unreaded': {
        this.bookListFiltered = this.bookListFiltered?.filter(
          (book) => !book.readed
        );
        break;
      }
    }
  }

  private filterBooks(params: Params) {
    this.bookListFiltered = this.bookList;
    // Marco 2 porque, al jsonizar el array de géneros, la longitud cuando no tiene ningún valor es 2
    if (params['genres'] && params['genres'].length > 2) {
      this.filterByGenre(JSON.parse(params['genres']));
    }
    if (params['readed'] !== undefined) {
      this.filterByReaded(JSON.parse(params['readed']));
    }
    if (params['orderBy']) {
      this.orderBy(Number(JSON.parse(params['orderBy'])));
    }
  }
}
