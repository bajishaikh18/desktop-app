import {  authorizedApiClient } from "./common";

const baseRoutes = "/user";

export const toggleNotifyForAgency = async (agencyId:string, type:'notify'|'unnotify') => {
  try {
    const response = await authorizedApiClient.patch(
      `${baseRoutes}/${type}/${agencyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch agencies:", error);
    throw error;
  }
};


