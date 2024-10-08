import { authorizedApiClient } from "./common";

const baseRoutes = '/job';

export const getJobs = async (page:number,fetchSize:number) => {
    try {
      const response = await authorizedApiClient.get(`${baseRoutes}/jobs`, {
        params: {
            type: "status",
            data: "pending",
            page: page,
            limit: fetchSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update user details:", error);
      throw error;
    }
  };