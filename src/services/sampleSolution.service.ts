/** @format */
import { VITE_SAMPLE_SOLUTION_ENDPOINT } from "@/constants/AppConfig";
import axios from "axios";

const axiosSampleSolution = axios.create({
  baseURL: VITE_SAMPLE_SOLUTION_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 900000,
});

export const getListSampleSolution = async (): Promise<any> => {
  return axiosSampleSolution.get("/solution", {
    params: {
      ordertype: "DESC",
    },
  });
};

export const getDetailsSampleSolution = async (id: string): Promise<any> => {
  return axiosSampleSolution.get(`/solution/${id}`);
};
