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
  email: string;
  name: string;
  stackId?: string;
  avatar?: string;
}
