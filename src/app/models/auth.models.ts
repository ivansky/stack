export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface User {
  stackId: string;
  email: string;
  name: string;
  avatar: string;
}
