import { type User } from './profile.interface';

export interface AuthResponse {
  token: string;
  user: User;
}
