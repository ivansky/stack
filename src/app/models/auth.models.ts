export interface LoginData {
  login: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  stackId: string;
  email: string;
  name: string;
  avatar: string;
}
