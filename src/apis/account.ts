import { isTokenValid } from "@/helpers/jwt";
import { apiClient, authorizedApiClient } from "./common";


const baseRoute = "/user";


export const getAppliedJobs = async () => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`${baseRoute}/appliedJobs`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch applied jobs:", error);
    throw error;
  }
};


export const getSavedJobs = async () => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`${baseRoute}/savedJobs`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    throw error;
  }
};
