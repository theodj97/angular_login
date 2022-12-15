import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  constructor(public override originalError?: any) {
    super(originalError);
  }
}
