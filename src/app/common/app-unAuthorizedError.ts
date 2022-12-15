import { AppError } from './app-error';

export class UnAuthorized extends AppError {
  constructor(public override originalError?: any) {
    super(originalError);
  }
}
