import { TestBed } from '@angular/core/testing';

import { UserBooksService } from './user-books.service';

describe('UserBooksService', () => {
  let service: UserBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
