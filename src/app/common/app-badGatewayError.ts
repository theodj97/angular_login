import { AppError } from './app-error';

export class BadGatewayError extends AppError {
  constructor(public override originalError?: any) {
    super(originalError);
  }
}
