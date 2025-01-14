import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { HttpError } from '../utils';
import { TokenPayload, UserRequest } from '../interfaces';
import { findUserById } from '../repositories';

import dotenv from 'dotenv';
dotenv.config();

const { USERS_SECRET_KEY } = process.env;

export const authenticate = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    const verifyToken = jwt.verify(token, `${USERS_SECRET_KEY}`) as TokenPayload;

    if (bearer !== 'Bearer' || !verifyToken) return next(HttpError({ status: 401 }));

    const user = await findUserById(verifyToken.id);
    if (!user) return next(HttpError({ status: 401 }));

    req.user = user;
    next();
  } catch (error) {
    next(HttpError({ status: 401 }));
  }
};
