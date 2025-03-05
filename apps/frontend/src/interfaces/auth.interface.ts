export interface Credentials {
  email: string;
  password: string;
}

export interface Register extends Credentials {
  username: string;
  validatePassword: string;
}
