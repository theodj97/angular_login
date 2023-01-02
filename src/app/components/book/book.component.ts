import { Component, Input } from '@angular/core';
import { UserBook } from 'src/app/models/userbook';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  inputs: ['book'],
})
export class BookComponent {
  @Input('book') book?: UserBook;
  // ApiURL da la url de la API para poder acceder a las imágenes desde el HTML
  apiURL = environment.apiUrl;
}
