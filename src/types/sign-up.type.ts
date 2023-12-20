export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GoogleSignUpData {
  code: string;
}

export interface KeycloakSignUpData {
  token: string;
}

export interface GoogleSignUpResponse {
  access_token: string;
  refresh_token: string;
}

export interface KeycloakSignUpResponse {
  access_token: string;
  refresh_token: string;
}
