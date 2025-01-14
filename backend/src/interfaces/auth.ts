import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

export interface TokenPayload extends JwtPayload {
  id: string;
}

export interface RefreshBody {
  refreshToken: string;
}

export interface AuthHelperDocument extends Document {
  password: string;
  isModified(field: string): boolean;
  isPasswordCorrect(password: string): Promise<boolean>;
}
