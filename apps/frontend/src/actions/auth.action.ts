import { type Register } from '@tanstack/react-query';

import { type Credentials } from '@app/interfaces/auth.interface';
import { loginService, registerService } from '@app/services/auth.service';

export const loginAction = (credentials: Credentials) => {
  return loginService(credentials);
};

export const registerAction = (credentials: Register) => {
  return registerService(credentials);
};
