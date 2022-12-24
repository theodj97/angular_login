import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { Book } from 'src/app/models/book';
import { UserBooksService } from 'src/app/services/userBooks/user-books.service';
import { DatePipe } from '@angular/common';

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
  bookList?: Array<Book>;
  bookListFiltered?: Array<Book>;

  ngOnInit(): void {
    this._userBook.getBooks().subscribe({
      next: (data: any) => {
        this.bookList = data;
        this.bookList?.forEach((book) => {
          book.publication_date = this._datePipe.transform(
            book.publication_date,
            'dd/MM/yyyy'
          )!;
        });
      },
      complete: () => {
        this.filterByGenre(this._activatedRoute.snapshot.queryParams['genres']);
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
        } else if (error instanceof BadGatewayError) {
        } else throw error;
      },
    });

    // Con este método obtengo los parámetros que se van añadiendo a la URL
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['genres']) {
        this.filterByGenre(JSON.parse(params['genres']));
      }
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
}
