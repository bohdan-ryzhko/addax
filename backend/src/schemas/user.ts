import Joi from 'joi';
import { IUserLoginValidateBody, IUserRegistrationValidateBody } from '../interfaces';
import { emailRegex } from '../constants';

export const validateRegistrationData = Joi.object<IUserRegistrationValidateBody>({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  countryCode: Joi.string().required(),
});

export const validateLoginData = Joi.object<IUserLoginValidateBody>({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

export const validateRefreshData = Joi.object({
  refreshToken: Joi.string().required(),
});
