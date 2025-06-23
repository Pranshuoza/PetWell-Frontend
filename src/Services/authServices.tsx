import axios from "axios";
import type { AxiosResponse } from "axios";

import { SERVER_BASE_URL } from "../utils/config";

// Pet User (Human Owner)
interface HumanOwnerSignupData {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string; // e.g., "Individual"
}

// Staff User
interface StaffSignupData {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string; // e.g., "Veterinarian"
  business_id: string;
}

// Business Owner
interface BusinessSignupData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  accessToken?: string;
  user?: {
    id: string;
    email: string;
    username?: string;
    name?: string;
    role?: string;
  };
}

const authServices = {
  async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<{ data: AuthResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.data) {
        throw new Error("Invalid response from server");
      }
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error("Login failed");
    }
  },

  // Pet User (Human Owner)
  async signupHumanOwner(data: HumanOwnerSignupData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<{ data: AuthResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/register/human-owner`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.data) {
        throw new Error("Invalid response from server");
      }
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        throw new Error(
          error.response.data.message || "Pet user signup failed"
        );
      }
      throw new Error("Pet user signup failed");
    }
  },

  // Staff User
  async signupStaff(data: StaffSignupData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<{ data: AuthResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/register/staff`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.data) {
        throw new Error("Invalid response from server");
      }
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        throw new Error(error.response.data.message || "Staff signup failed");
      }
      throw new Error("Staff signup failed");
    }
  },

  // Business Owner
  async signupBusiness(data: BusinessSignupData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<{ data: AuthResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/register/business`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.data) {
        throw new Error("Invalid response from server");
      }
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        throw new Error(
          error.response.data.message || "Business signup failed"
        );
      }
      throw new Error("Business signup failed");
    }
  },
};

export default authServices;
