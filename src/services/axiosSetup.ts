import { ROUTE_PATH, VITE_API_ENDPOINT } from "@/constants/AppConfig";
import { CookiesHelper } from "@/helper/cookies";
import axios from "axios";

const API_ENDPOINT: string = VITE_API_ENDPOINT;

const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 3000,
  // withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = CookiesHelper.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      CookiesHelper.remove("accessToken");
      window.open(`${ROUTE_PATH.SIGN_IN()}`, "_self");
    }
    return Promise.reject(error);
  }
);

export const getRequest = async (url: string) => {
  return axiosClient.get(`/${url}`).then((response) => response);
};

export const getExternal = async (url: string) => {
  return axiosClient.get(`${url}`).then((response) => response);
};

export const postRequest = async (url: string, payload: unknown) => {
  return axiosClient.post(`/${url}`, payload).then((response) => response);
};

export const patchRequest = async (url: string, payload: unknown) => {
  return axiosClient.patch(`/${url}`, payload).then((response) => response);
};

export const deleteRequest = async (url: string) => {
  return axiosClient.delete(`/${url}`).then((response) => response);
};
