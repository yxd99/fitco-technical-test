import { type Register } from '@tanstack/react-query';

import { type Credentials } from '@app/interfaces/auth.interface';
import { httpClient } from '@app/lib/http';

import { type AuthResponse } from './interfaces/auth.interface';

export const loginService = async (credentials: Credentials) => {
  const { data } = await httpClient.post<AuthResponse, Credentials>(
    '/auth/login',
    credentials
  );
  return data;
};

export const registerService = async (credentials: Register) => {
  const { data } = await httpClient.post<AuthResponse, Register>(
    '/auth/register',
    credentials
  );
  return data;
};
