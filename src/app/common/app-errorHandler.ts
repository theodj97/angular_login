import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  // El objetivo es hacer un toast para mostrar al usuario que no tiene conexión a internet
  handleError(error: any): void {
    console.log('Unexpected error occurred: ', error);
  }
}
