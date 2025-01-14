import { IUserDocument, IUserDto } from '../interfaces';

export const UserDto = (userDocument: IUserDocument): IUserDto => ({
  id: userDocument._id.toString(),
  email: userDocument.email,
  countryCode: userDocument.countryCode,
});
