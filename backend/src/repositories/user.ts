import { IUser } from '../interfaces';
import { User } from '../models';

export const createUser = (newUser: IUser) => User.create(newUser);

export const findUserByEmail = (email: string) => User.findOne({ email });

export const findUserById = (id: string) => User.findById(id);

export const findUserByRefreshToken = (refreshToken: string) => User.findOne({ refreshToken });

export const updateUserById = (userId: string, user: Partial<IUser>) =>
  User.findByIdAndUpdate(userId, { $set: user }, { new: true });
