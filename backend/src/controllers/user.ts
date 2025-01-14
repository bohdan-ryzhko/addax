import jwt from 'jsonwebtoken';
import { IUser, RefreshBody, TokenPayload, UserRequest } from '../interfaces';
import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  updateUserById,
} from '../repositories';
import { ctrlWrapper, generateAccessAndRefreshTokens, HttpError } from '../utils';
import { UserDto } from '../dtos';

import dotenv from 'dotenv';
dotenv.config();

const { USERS_REFRESH_SECRET_KEY = '' } = process.env;

export const userRegistration = ctrlWrapper(async (req, res) => {
  const createdUser = await createUser(req.body);

  if (!createUser) throw HttpError({ status: 500 });

  await createdUser.save();

  const user = UserDto(createdUser);

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);

  if (!accessToken || !refreshToken) throw HttpError({ status: 500 });

  res.status(201).json({ data: { user, accessToken, refreshToken } });
});

export const userLogin = ctrlWrapper(async (req, res) => {
  const { email, password }: IUser = req.body;

  const foundUser = await findUserByEmail(email);

  if (!foundUser) throw HttpError({ status: 404, message: 'User not found' });

  const isPasswordValid = await foundUser.isPasswordCorrect(password);

  if (!isPasswordValid)
    throw HttpError({
      status: 401,
      message: 'Email or password invalid',
    });

  const user = UserDto(foundUser);

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);

  res.status(201).json({ data: { user, accessToken, refreshToken } });
});

export const userRefresh = ctrlWrapper(async (req, res) => {
  const body: RefreshBody = req.body;

  const verifyToken = jwt.verify(body.refreshToken, USERS_REFRESH_SECRET_KEY) as TokenPayload;

  const fondUser = await findUserByRefreshToken(body.refreshToken);

  if (!verifyToken || !fondUser) throw HttpError({ status: 409 });

  const user = UserDto(fondUser);

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);

  res.status(201).json({ data: { user, accessToken, refreshToken } });
});

export const userLogout = ctrlWrapper(async (req: UserRequest, res) => {
  const user = req.user;

  if (!user) throw HttpError({ status: 401 });

  const findUser = await findUserByEmail(user.email);

  if (!findUser) throw HttpError({ status: 401 });

  await updateUserById(findUser._id.toString(), {
    refreshToken: '',
  });

  res.status(200).json({});
});
