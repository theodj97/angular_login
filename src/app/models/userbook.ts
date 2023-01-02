import { Book } from './book';

export class UserBook extends Book {
  constructor(
    _id: number,
    _title: string,
    _author: string,
    _thumbnail: string,
    _publication_date: string,
    _page_count: number,
    _genre: number,
    _genre_name: string,
    _purchased: Date,
    _readed: boolean,
    _page_index: number
  ) {
    super(
      _id,
      _title,
      _author,
      _thumbnail,
      _publication_date,
      _page_count,
      _genre,
      _genre_name
    );
  }

  get purchased(): Date {
    return this.purchased;
  }

  set purchased(value: Date) {
    this.purchased = value;
  }

  get readed(): boolean {
    return this.readed;
  }

  set readed(value: boolean) {
    this.readed = value;
  }

  get page_index(): number {
    return this.page_index;
  }

  set page_index(value: number) {
    this.page_index = value;
  }
}
