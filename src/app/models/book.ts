export class Book {
  constructor(
    private _id: number,
    private _title: string,
    private _author: string,
    private _publisher: string,
    private _publication_date: string,
    private _page_count: number,
    private _genre: string
  ) {}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get publisher(): string {
    return this._publisher;
  }

  set publisher(value: string) {
    this._publisher = value;
  }

  get publication_date(): string {
    return this._publication_date;
  }

  set publication_date(value: string) {
    this._publication_date = value;
  }

  get page_count(): number {
    return this._page_count;
  }

  set page_count(value: number) {
    this._page_count = value;
  }

  get genre(): string {
    return this._genre;
  }

  set genre(value: string) {
    this._genre = value;
  }
}
