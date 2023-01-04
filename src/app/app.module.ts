import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login/login.service';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './common/app-errorHandler';
import { UserBooksService } from './services/userBooks/user-books.service';
import { DatePipe } from '@angular/common';
import { PasswdHashService } from './services/passwdHash/passwd-hash.service';
import { BookComponent } from './components/book/book.component';
import { BooksfilterComponent } from './components/booksFilter/booksfilter/booksfilter.component';
import { NavMenuComponent } from './components/navMenu/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, BookComponent, BooksfilterComponent, NavMenuComponent, LibraryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    LoginService,
    AuthGuardService,
    UserBooksService,
    DatePipe,
    PasswdHashService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
