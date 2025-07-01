import apiClient from "@/lib/axios";
import { OfficialDoc } from "./types";

export const fetchOfficialDocs = async (keyword = "", page = 1): Promise<{
  data: OfficialDoc[];
  total: number;
}> => {
  const response = await apiClient.get("/public-letter/list", {
    params: { keyword, page },
  });
  return response.data;
};