import { apiClient } from "./common";

const baseRoutes = "/job";

export const getJobs = async (
  page: number,
  fetchSize: number,
  filter?: string,
  field?: string
) => {
  try {
    const response = await apiClient.get(`${baseRoutes}/jobs`, {
      params: {
        type: "status",
        data: "active",
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
    const response = await apiClient.get(`${baseRoutes}/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
