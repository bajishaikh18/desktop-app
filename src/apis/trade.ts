import { isTokenValid } from "@/helpers/jwt";
import { apiClient, authorizedApiClient } from "./common";


const basePath = "/trade";

export const gettrades = async ({
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
    const response = await client.get(`${basePath}/trades`, {
      params: {
        page: page,
        limit: fetchSize,
        filters: filters || {}
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch trades:", error);
    throw error;
  }
};

export const getTradeTestCenterById = async (id: string) => {
  try {
    const response = await apiClient.get(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getTradeDetails = async (tradeId: any) => { 
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`/trade/${tradeId}`, {});

    console.log("Trade API Response:", response.data); 
    return response.data;
  } catch (error) {   
    console.error("Failed to fetch trade details:", error);
    throw error;
  }
};
