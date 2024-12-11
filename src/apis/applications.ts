import { authorizedApiClient } from "./common";
const baseRoutes = "application";

export type ApplicationPayload = {
  jobId: string;
  resume: string;
  userId: string;
  workVideo?: string;
};

export const createApplication = async (payload: ApplicationPayload) => {
  try {
    const response = await authorizedApiClient.post(baseRoutes,payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJobApplication = async (id: string) => {
  try {
    const response = await authorizedApiClient.get(`${baseRoutes}/application/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplication = async (id:string, payload: ApplicationPayload) => {
  try {
    const response = await authorizedApiClient.put(`${baseRoutes}/${id}`,payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};