import { BaseResponse, BaseSliceState } from './base';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginData {
  countryCode: string;
}

export interface IUser extends IRegistrationData {
  id: string;
}

export interface AuthState extends Omit<BaseSliceState<IUser | null>, 'data' | 'fetching'> {
  refreshing: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
  loading: boolean;
}

export interface IUserData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IFetchUserResponse extends BaseResponse<IUserData> {}

export interface ILoginResponse extends BaseResponse<IUserData> {}

export interface IRegistrationResponse extends BaseResponse<IUserData> {}

export interface IUpdateUserInfoResponse extends BaseResponse<Pick<IUserData, 'user'>> {}
