import { isTokenValid } from "@/helpers/jwt";
import { apiClient, authorizedApiClient } from "./common";

const baseRoutes = "/agency";

export const getAgencies = async ({
    page,
    fetchSize,
    filters,
  }: {
    page: number;
    fetchSize: number;
    filters:{
     state ?: string;
     city ?:string;
      
    }
  }) => {
    try {
     const client = isTokenValid() ? authorizedApiClient : apiClient;
      const response = await client.get(`${baseRoutes}/agencies`, {
        params: {
          page: page,
          limit: fetchSize,
          filters: filters || {}
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update agency details:", error);
      throw error;
    }
  };

  export const getAgencyDetails = async (id: string) => {
    try {
      const client = isTokenValid() ? authorizedApiClient : apiClient;
      const response = await client.get(`${baseRoutes}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  