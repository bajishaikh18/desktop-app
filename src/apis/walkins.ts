import { isTokenValid } from "@/helpers/jwt";
import { apiClient, authorizedApiClient } from "./common";

const baseRoutes = "/interview";

export const getWalkins = async ({
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
    const response = await client.get(`${baseRoutes}/interviews`, {
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

export const getWalkinsDetails = async (id: string) => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`${baseRoutes}/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const convertCurrency = async (
  id: string,
  amount: number,
  fromCurrency: string,
  toCurrency: string
) => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;

    const response = await client.post(`/convertCurrency`, {
      name: id,
      from: fromCurrency.toLowerCase(), 
      to: toCurrency.toLowerCase(),      
      amount,
    });

    return response.data.convertedAmount;
  } catch (error) {
    console.error("Failed to convert currency:", error);
    throw error;
  }
};





export const saveInterview = async (interviewId: string) => {
  try {
    const client = authorizedApiClient;
    const response = await client.patch(`/user/addSavedInterview/${interviewId}`); 
    return response.data;
  } catch (error) {
    console.error("Failed to save interview:", error);
    throw error;
  }
};

export const removeSavedInterview = async (interviewId: string)  => {
  try {
    const client = authorizedApiClient;
    const response = await client.patch(`/user/removeSavedInterview/${interviewId}`);
    return response.data; 
  } catch (error) {
    console.error("Failed to remove saved Interview:", error);
    throw error;
  }
};


export const reportWalkins = async (jobId: string) => {
  try {
    const client = authorizedApiClient;
    const response = await client.post(`${baseRoutes}/reportjob/${jobId}`);
    return response.data; 
  } catch (error) {
    console.error("Failed to remove saved job:", error);
    throw error;
  }
};


export const getAgencyDetails = async (agencyId: any) => { 
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;
    const response = await client.get(`/agency/${agencyId._id}`, {});

    console.log("Agency API Response:", response.data); 
    return response.data;
  } catch (error) {   
    console.error("Failed to fetch agency details:", error);
    throw error;
  }
};







