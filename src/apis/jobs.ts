import { isTokenValid } from "@/helpers/jwt";
import { apiClient, authorizedApiClient } from "./common";

const baseRoutes = "/job";

export const getJobs = async ({
  page,
  fetchSize,
  filters,
}: {
  page: number;
  fetchSize: number;
  filters:{
    jobTitle?: string;
    location?:string;
  }
}) => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`${baseRoutes}/jobs`, {
      params: {
        page: page,
        limit: fetchSize,
        filters: filters || {}
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user details:", error);
    throw error;
  }
};

export const getJobDetails = async (id: string) => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`${baseRoutes}/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
