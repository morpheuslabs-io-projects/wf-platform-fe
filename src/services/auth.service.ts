import { KeycloakSignInData, KeycloakSignInResponse } from "@/types";

import { ROUTE_PATH, VITE_AUTH_API_ENDPOINT } from "@/constants/AppConfig";
import { CookiesHelper } from "@/helper/cookies";
import axios from "axios";
import { AxiosCommon } from "@/helper/axios";

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
      window.open(`${ROUTE_PATH.SIGN_IN()}`, "_self");
    }
    const message = error.response.data.message || error.message;
    return Promise.reject(message);
  }
);

const postRequest = async <T>(url: string, payload?: unknown): Promise<T> => {
  return axiosAuthClient.post(`/${url}`, JSON.stringify(payload));
};

export const getTokensByKeycloakToken = async (
  data: KeycloakSignInData
): Promise<KeycloakSignInResponse> => {
  const resp = await postRequest<KeycloakSignInResponse>(
    "auth/keycloak/get-tokens",
    data
  );
  return resp;
};

const authClient = new AxiosCommon(VITE_AUTH_API_ENDPOINT);

export const verify = async (): Promise<any> => {
  const res = await authClient.getRequest(`auth/verify`);
  return res.data;
};
