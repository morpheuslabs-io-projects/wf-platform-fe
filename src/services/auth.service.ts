import {
  GoogleSignInData,
  GoogleSignInResponse,
  GoogleSignUpData,
  GoogleSignUpResponse,
  KeycloakSignInData,
  KeycloakSignInResponse,
  KeycloakSignUpResponse,
  SignInData,
} from "@/types";

import axios from "axios";
import { ROUTE_PATH, VITE_AUTH_API_ENDPOINT } from "@/constants/AppConfig";
import { CookiesHelper } from "@/helper/cookies";
import { redirect } from "react-router-dom";

const axiosAuthClient = axios.create({
  baseURL: VITE_AUTH_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 900000,
});

axiosAuthClient.interceptors.request.use(
  (config) => {
    const accessToken = CookiesHelper.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosAuthClient.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async (error) => {
    if (error.response.status === 401) {
      CookiesHelper.remove("accessToken");
      redirect(ROUTE_PATH.SIGN_IN);
    }
    const message = error.response.data.message || error.message;
    return Promise.reject(message);
  }
);

const postRequest = async <T>(url: string, payload?: unknown): Promise<T> => {
  return axiosAuthClient.post(`/${url}`, JSON.stringify(payload));
};

export const signIn = async (data: SignInData) => {
  const resp = await postRequest("auth/login", data);
  return resp;
};

export const signInGoogle = async (
  data: GoogleSignInData
): Promise<GoogleSignInResponse> => {
  const resp = await postRequest<GoogleSignInResponse>(
    "auth/google/login",
    data
  );
  return resp;
};

export const signInKeycloak = async (
  data: KeycloakSignInData
): Promise<KeycloakSignInResponse> => {
  const resp = await postRequest<KeycloakSignInResponse>(
    "auth/keycloak/login",
    data
  );
  return resp;
};

export const signUp = async (data: SignInData) => {
  const resp = await postRequest("auth/sign-up", data);
  return resp;
};

export const signUpGoogle = async (
  data: GoogleSignUpData
): Promise<GoogleSignUpResponse> => {
  const resp = await postRequest<GoogleSignUpResponse>(
    "auth/google/register",
    data
  );
  return resp;
};

export const signUpKeycloak = async (
  data: KeycloakSignInData
): Promise<KeycloakSignUpResponse> => {
  const resp = await postRequest<KeycloakSignUpResponse>(
    "auth/keycloak/register",
    data
  );
  return resp;
};
