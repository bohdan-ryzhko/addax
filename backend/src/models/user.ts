import { model, Schema } from 'mongoose';

import { AuthHelperDocument, IUserDocument } from '../interfaces';
import { emailRegex } from '../constants';
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from '../middlewares';

import dotenv from 'dotenv';
dotenv.config();

const {
  USERS_SECRET_KEY = '',
  USERS_REFRESH_SECRET_KEY = '',
  ACCESS_TOKEN_EXPIRES_IN = '',
  REFRESH_TOKEN_EXPIRES_IN = '',
} = process.env;

const UserSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    match: emailRegex,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required'],
  },
  refreshToken: {
    type: String,
  },
  countryCode: {
    type: String,
    required: [true, 'Country code is required'],
  },
});

UserSchema.pre('save', function (next) {
  hashPassword.call(this, next);
});

// Method to check if the entered password is correct
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await comparePasswords.call(this as AuthHelperDocument, password);
};

// Method to generate an access token
UserSchema.methods.generateAccessToken = function () {
  return generateAccessToken.call(
    this as AuthHelperDocument,
    USERS_SECRET_KEY,
    ACCESS_TOKEN_EXPIRES_IN,
  );
};

// Method to generate a refresh token
UserSchema.methods.generateRefreshToken = function () {
  return generateRefreshToken.call(
    this as AuthHelperDocument,
    USERS_REFRESH_SECRET_KEY,
    REFRESH_TOKEN_EXPIRES_IN,
  );
};

export const User = model<IUserDocument>('User', UserSchema);
