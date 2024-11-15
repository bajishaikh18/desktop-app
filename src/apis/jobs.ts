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
    agencyId?:string;
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

export const convertCurrency = async (
  jobId: string,
  amount: number,
  fromCurrency: string,
  toCurrency: string
) => {
  try {
    const client = isTokenValid() ? authorizedApiClient : apiClient;

    const response = await client.post(`/convertCurrency`, {
      name: jobId,
      from: fromCurrency.toLowerCase(), 
      to: toCurrency.toLowerCase(),      
      amount,
    });

    return response.data.amount;
  } catch (error) {
    console.error("Failed to convert currency:", error);
    throw error;
  }
};





export const saveJob = async (jobId: string) => {
  try {
    const client = authorizedApiClient;
    const response = await client.patch(`/user/addSavedJob/${jobId}`); 
    return response.data;
  } catch (error) {
    console.error("Failed to save job:", error);
    throw error;
  }
};

export const removeSavedJob = async (jobId: string) => {
  try {
    const client = authorizedApiClient;
    const response = await client.patch(`/user/removeSavedJob/${jobId}`);
    return response.data; 
  } catch (error) {
    console.error("Failed to remove saved job:", error);
    throw error;
  }
};


export const reportJob = async (jobId: string) => {
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
    const response = await client.get(`/agency/${agencyId}`, {});

    console.log("Agency API Response:", response.data); 
    return response.data;
  } catch (error) {   
    console.error("Failed to fetch agency details:", error);
    throw error;
  }
};







