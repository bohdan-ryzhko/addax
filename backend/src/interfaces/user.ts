import { Request } from 'express';

export interface IUserBody {
  _id: string;
  email: string;
  countryCode: string;
}

export interface IUser extends IUserBody {
  password: string;
  refreshToken?: string;
}

export interface IUserRegistrationValidateBody extends Omit<IUser, '_id'> {}

export interface IUserLoginValidateBody extends Pick<IUser, 'email' | 'password'> {}

export interface IUserDto
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
