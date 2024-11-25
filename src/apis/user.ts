import {  authorizedApiClient } from "./common";

const baseRoutes = "/user";

export const notifyForAgency = async (agencyId:string) => {
  try {
    const response = await authorizedApiClient.patch(
      `${baseRoutes}/notify/${agencyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch agencies:", error);
    throw error;
  }
};
