import { VITE_AUTH_API_ENDPOINT } from "@/constants/AppConfig";
import { CookiesHelper } from "@/helper/cookies";
import axios, { Axios, ResponseType } from "axios";

export class AxiosCommon {
  client: Axios;

  defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  defaultTimeout = 0;

  constructor(endpoint: string, responseType?: ResponseType) {
    this.client = responseType
      ? axios.create({
          baseURL: endpoint,
          headers: this.defaultHeaders,
          timeout: this.defaultTimeout,
          responseType: responseType,
          transformRequest: [
            (data, headers) => {
              if (data instanceof FormData) {
                if (headers) {
                  delete headers["Content-Type"];
                }
                return data;
              }
              return JSON.stringify(data);
            },
          ],
        })
      : axios.create({
          baseURL: endpoint,
          headers: this.defaultHeaders,
          timeout: this.defaultTimeout,
          transformRequest: [
            (data, headers) => {
              if (data instanceof FormData) {
                if (headers) {
                  delete headers["Content-Type"];
                }
                return data;
              }
              return JSON.stringify(data);
            },
          ],
        });

    this.client.interceptors.request.use(
      (config) => {
        const accessToken = CookiesHelper.get("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      async (error) => {
        const message = error?.response?.data || error;
        return Promise.reject(message);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const status = error?.response?.status || null;
        const data = error?.response?.status || {};
        const message = data?.message || "";

        if (
          status === 401 &&
          !(error?.config?.url || "").includes("login") &&
          !(error?.config?.url || "").includes("refresh-session") &&
          message !=
            "Currently the platform functions are restricted for private access"
        ) {
          const { access_token, refresh_token } = await refreshSession();
          CookiesHelper.clearAll();
          CookiesHelper.set("accessToken", access_token);
          CookiesHelper.set("refreshToken", refresh_token);
        } else {
          const message = error?.response?.data || error;
          return Promise.reject(message);
        }
      }
    );
  }

  parseParams(params: Record<string, unknown>): string {
    const keys = Object.keys(params);
    let options = "";

    keys.forEach((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          options += `${key}=${item}&`;
        });
      } else {
        options += `${key}=${value}&`;
      }
    });
    return options ? options.slice(0, -1) : options;
  }

  getRequest = async (url: string, params?: object) => {
    return params
      ? this.client
          .get(`/${url}`, {
            params,
            paramsSerializer: (paramsFormat) => this.parseParams(paramsFormat),
          })
          .then((response) => response)
      : this.client.get(`/${url}`).then((response) => response);
  };

  getExternal = async (url: string, params?: object) => {
    return params
      ? this.client
          .get(`${url}`, {
            params,
            paramsSerializer: (paramsFormat) => this.parseParams(paramsFormat),
          })
          .then((response) => response)
      : this.client.get(`${url}`).then((response) => response);
  };

  postRequest = async (url: string, payload?: unknown) => {
    return this.client.post(`/${url}`, payload).then((response) => response);
  };

  patchRequest = async (url: string, payload: unknown) => {
    return this.client.patch(`/${url}`, payload).then((response) => response);
  };

  putRequest = async (url: string, payload?: unknown) => {
    return this.client.put(`/${url}`, payload).then((response) => response);
  };

  deleteRequest = async (url: string, params?: object) => {
    return params
      ? this.client
          .delete(`/${url}`, { data: params })
          .then((response) => response)
      : this.client.delete(`/${url}`).then((response) => response);
  };
}

export const refreshSession = async () => {
  const axiosClient = axios.create({
    baseURL: VITE_AUTH_API_ENDPOINT,
  });
  const token = CookiesHelper.get("accessToken");
  const res = await axiosClient.post(`auth/refresh-session`, {
    token,
  });
  return res?.data?.data || {};
};
