import { VITE_WF_ADMIN_ENDPOINT } from "@/constants/AppConfig";
import axios from "axios";

const axiosWfAdminEndPoint = axios.create({
  baseURL: VITE_WF_ADMIN_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 3000,
});

export const getListIntroductionVideos = async (): Promise<any> => {
  const response = await axiosWfAdminEndPoint.get(
    "/introduction?platform=lp"
  );
  return response?.data;
};

export const getListSampleSolution = async (): Promise<any> => {
  return axiosWfAdminEndPoint.get("/solution", {
    params: {
      ordertype: "DESC",
    },
  });
};

export const getDetailsSampleSolution = async (id: string): Promise<any> => {
  return axiosWfAdminEndPoint.get(`/solution/${id}`);
};