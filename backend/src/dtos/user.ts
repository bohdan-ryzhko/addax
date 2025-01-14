import { IUserDocument, IUserDTO } from '../interfaces';

export const UserDto = (userDocument: IUserDocument): IUserDTO => ({
  id: userDocument._id.toString(),
  email: userDocument.email,
  countryCode: userDocument.countryCode,
});
