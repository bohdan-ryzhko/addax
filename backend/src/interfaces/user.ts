import { Request } from 'express';
import { Types } from 'mongoose';

export interface IUserBody {
  _id: Types.ObjectId;
  email: string;
  countryCode: string;
}

export interface IUser extends IUserBody {
  password: string;
  refreshToken?: string;
}

export interface IUserRegistrationValidateBody extends Omit<IUser, '_id'> {}

export interface IUserLoginValidateBody extends Pick<IUser, 'email' | 'password'> {}

export interface IUserDTO
  extends Required<Pick<IUserRegistrationValidateBody, 'email' | 'countryCode'>> {
  id: string;
}

export interface UserRequest extends Request {
  user?: IUser | null;
}

export interface IUserDocument extends IUser, Document {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
