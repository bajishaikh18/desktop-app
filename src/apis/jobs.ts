import { isTokenValid } from "@/helpers/jwt";
import { apiClient, authorizedApiClient } from "./common";

const baseRoutes = "/job";

export const getJobs = async ({
  page,
  fetchSize,
  type,
  data,
  filter,
  field,
}: {
  page: number;
  fetchSize: number;
  type?: string;
  data?: string;
  filter?: string;
  field?: string;
  country?: string;
}) => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`${baseRoutes}/jobs`, {
      params: {
        type: type,
        data: data,
        page: page,
        limit: fetchSize,
        field: field || "",
        filterTerm: filter,
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
