export interface SignInData {
  email: string;
  password: string;
}

export interface GoogleSignInData {
  code: string;
}

export interface KeycloakSignInData {
  token: string;
}

export interface GoogleSignInResponse {
  access_token: string;
  refresh_token: string;
}

export interface KeycloakSignInResponse {
  access_token: string;
  refresh_token: string;
}
