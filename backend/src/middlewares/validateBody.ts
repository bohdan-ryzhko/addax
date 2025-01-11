import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => (req: Request, _: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error !== undefined) next(HttpError({ status: 400, message: error.message }));

  next();
};
