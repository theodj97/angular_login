import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  inputs: ['book'],
})
export class BookComponent {
  @Input('book') book?: Book;
  apiURL = environment.apiUrl;
}
