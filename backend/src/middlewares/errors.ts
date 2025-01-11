import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../interfaces';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  next: NextFunction,
) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
};
