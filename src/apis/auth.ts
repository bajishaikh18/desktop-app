import { apiClient } from "./common";

interface SignupData {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
}

interface ProfessionalDetails {
  currentJobTitle: string;
  industry: string;
  experienceYears: string;
  gulfExperience: string;
  currentState: string;
}

export const loginWithPhone = async (phone: string) => {
  try {
    const response = await apiClient.post("/user/login", { phone });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const signup = async (data: SignupData) => {
  try {
    const response = await apiClient.post("/user/signup/phone", data);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const updateUser = async (userDetails: ProfessionalDetails) => {
  try {
    const response = await apiClient.patch("/user", userDetails);
    return response.data;
  } catch (error) {
    console.error("Failed to update user details:", error);
    throw error;
  }
};


export const verifyOtp = async (otp: string,phone:string) => {
  try {
    const response = await apiClient.post("user/login/phone", {
      phone,
      otp
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user details:", error);
    throw error;
  }
};

