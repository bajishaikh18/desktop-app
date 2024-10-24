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
