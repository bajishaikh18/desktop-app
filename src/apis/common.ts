import { BASE_URL } from "@/helpers/constants";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authorizedApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authorizedApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getSignedUrl = async (fileType: string,contentType:string) => {
  try {
    const response = await authorizedApiClient.get("/file/getUploadUrl", {
      params: {
        fileType: fileType,
        contentType: contentType
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user details:", error);
    throw error;
  }
};

export const uploadFile = async (url: string, file:File) => {
  try {
    const response = await apiClient.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user details:", error);
    throw error;
  }
};

export const getJobTitles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/jobTitle`);
    return response.data.jobTitles;
  } catch (error) {
    console.error("Failed to get upload url", error);
    throw error;
  }
};
