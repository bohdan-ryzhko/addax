import { errorMessages } from '../constants';

export type HttpStatus = keyof typeof errorMessages;

export interface CustomError extends Error {
  status?: HttpStatus;
  code?: number;
}
