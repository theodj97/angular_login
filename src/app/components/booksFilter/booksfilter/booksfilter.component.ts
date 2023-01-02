import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  queryPrms?: NavigationExtras = {};
  genresList?: Array<Genre>;
  orderByList?: Array<string> = [
    'Order by',
    'Higher number of pages',
    'Lower number of pages',
    'Oldest published',
    'Newest published',
    'Oldest purchased',
    'Newest purchased',
  ];
  genreSettedById: Array<number> = [];
  checkBoxesActives?: Array<boolean> = [];
  orderBySelector?: number;

  ngOnInit(): void {
    this._booksGenreService.getGenres().subscribe({
      next: (data: any) => {
        this.genresList = data;
      },
      complete: () => {
        // Este método se debe de poder optimizar, o hacer el proceso en un método aparte
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
          this.queryPrms = Object.assign({}, this.queryPrms, {
            genres: JSON.stringify(this.genreSettedById),
          });
        }
        if (
          this._router.routerState.snapshot.root.queryParams['orderBy'] !==
          undefined
        ) {
          this.orderBySelector = Number(
            JSON.parse(
              this._router.routerState.snapshot.root.queryParams['orderBy']
            )
          );
          this.queryPrms = Object.assign({}, this.queryPrms, {
            orderBy: JSON.stringify(this.orderBySelector),
          });
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
      this.setParams(1);
    } else {
      this.genreSettedById = this.genreSettedById?.filter(
        (genreId) => genreId !== id
      );
      this.setParams(1);
    }
  }

  private setParams(toBeFilter: number) {
    switch (toBeFilter) {
      case 1:
        this.queryPrms = Object.assign({}, this.queryPrms, {
          genres: JSON.stringify(this.genreSettedById),
        });
        break;
      case 2:
        this.queryPrms = Object.assign({}, this.queryPrms, {
          orderBy: JSON.stringify(this.orderBySelector),
        });
        break;
      default:
        this.queryPrms = {};
        break;
    }
    this._router.navigate([], { queryParams: this.queryPrms });
  }

  orderByChange(event: any) {
    this.orderBySelector = event.target.value;
    this.setParams(2);
  }
}
