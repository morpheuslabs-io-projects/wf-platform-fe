import { VITE_SAMPLE_SOLUTION_ENDPOINT } from "@/constants/AppConfig";
import axios from "axios";

const axiosIntroductionVideo = axios.create({
  baseURL: VITE_SAMPLE_SOLUTION_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 300,
});

export const getListIntroductionVideos = async (): Promise<any> => {
  const response = await axiosIntroductionVideo.get("/introduction");
  return response?.data;
};
