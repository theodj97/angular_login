import { TestBed } from '@angular/core/testing';

import { BooksGenreService } from './books-genre.service';

describe('BooksGenreService', () => {
  let service: BooksGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
