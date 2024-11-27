import { isTokenValid } from "@/helpers/jwt";
import { apiClient, authorizedApiClient } from "./common";


const baseRoutes = "/agency";

export const getAgencies = async ({
  page,
  fetchSize,
  filters = {},
}: {
  page: number;
  fetchSize: number;
  filters: { cities?: string,name?:string }; 
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
    console.error("Failed to fetch agencies:", error);
    throw error;
  }
};


export const reportagencyissue = async (agencyId: string): Promise<any> => {
  try {
    const response = await authorizedApiClient.post(
      `${baseRoutes}/reportagency/${agencyId}`
    );
    return response.data; 
  } catch (error) {
    console.error("Failed to send report agency confirmation email:", error);
    throw error; 
  }
};