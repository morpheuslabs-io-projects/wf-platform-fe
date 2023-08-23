import { IAccessData } from "@/types";
import { postRequest } from "./axiosSetup";

export const signGoogleFn = async (accessToken: string): Promise<IAccessData> => {
  const API_END_POINT = "auth/google/login";
  const response = await postRequest(API_END_POINT, {
    accessToken
  });
  return response.data;
};
