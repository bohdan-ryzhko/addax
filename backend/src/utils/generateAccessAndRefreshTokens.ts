/* eslint-disable @typescript-eslint/no-explicit-any */
import { findUserById } from '../repositories';
import { HttpError } from '../utils';

export const generateAccessAndRefreshTokens = async (userId: string) => {
  try {
    // Find the user by ID in the database
    const user = await findUserById(userId);

    if (!user) throw HttpError({ status: 404 });

    // Generate an access token and a refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token to the user in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Return the generated tokens
    return { accessToken, refreshToken };
  } catch (error: any) {
    throw HttpError({ status: 400 });
  }
};
