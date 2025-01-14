import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AuthHelperDocument } from '../interfaces';

export async function hashPassword<T extends AuthHelperDocument>(
  this: T,
  next: CallbackWithoutResultAndOptionalError,
): Promise<void> {
  if (!this.isModified('password')) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
}

export async function comparePasswords<T extends AuthHelperDocument>(
  this: T,
  password: string,
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
}

export function generateAccessToken<T extends AuthHelperDocument>(
  this: T,
  secretKey: string,
  expiresIn: string,
) {
  return jwt.sign({ id: this._id }, secretKey, { expiresIn });
}

export function generateRefreshToken<T extends AuthHelperDocument>(
  this: T,
  secretKey: string,
  expiresIn: string,
) {
  return jwt.sign({ id: this._id }, secretKey, { expiresIn });
}
