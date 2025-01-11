import { errorMessages } from '../constants';
import { CustomError, HttpStatus } from '../interfaces';

type HttpErrorParams = {
  status: HttpStatus;
  message?: string;
};

export const HttpError = ({ status, message = errorMessages[status] }: HttpErrorParams) => {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
};
