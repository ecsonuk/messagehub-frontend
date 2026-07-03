export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginUser {
  id: string;
  username: string;
  fullName: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: LoginUser;
}
