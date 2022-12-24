import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BadGatewayError } from 'src/app/common/app-badGatewayError';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'src/app/common/app-notFounError';
import { Genre } from 'src/app/models/genre';
import { BooksGenreService } from 'src/app/services/booksGenre/books-genre.service';

@Component({
  selector: 'booksfilter',
  templateUrl: './booksfilter.component.html',
  styleUrls: ['./booksfilter.component.css'],
})
export class BooksfilterComponent implements OnInit {
  constructor(
    private _booksGenreService: BooksGenreService,
    private _router: Router
  ) {}

  genresList?: Array<Genre>;
  genreSettedById: Array<number> = [];
  checkBoxesActives?: Array<boolean> = [];

  ngOnInit(): void {
    this._booksGenreService.getGenres().subscribe({
      next: (data: any) => {
        this.genresList = data;
      },
      complete: () => {
        if (
          this._router.routerState.snapshot.root.queryParams['genres'] !==
          undefined
        ) {
          this.genreSettedById = JSON.parse(
            this._router.routerState.snapshot.root.queryParams['genres']
          );
          this.checkBoxesActives = this.genresList?.map((genre) =>
            this.genreSettedById.includes(genre.id)
          );
        }
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
        } else if (error instanceof BadGatewayError) {
        } else throw error;
      },
    });
  }

  filterGenre(id: number, event: any) {
    if (event.target.checked) {
      this.genreSettedById?.push(id);
      this.setParams();
    } else {
      this.genreSettedById = this.genreSettedById?.filter(
        (genreId) => genreId !== id
      );
      this.setParams();
    }
  }

  private setParams() {
    this._router.navigate([], {
      queryParams: { genres: JSON.stringify(this.genreSettedById) },
    });
  }
}
