import axios from "axios";
import type { AxiosResponse } from "axios";

import { SERVER_BASE_URL } from "../utils/config";

// Pet User (Human Owner)
interface HumanOwnerSignupData {
  username: string;
  human_owner_name: string;
  email: string;
  location: string;
  phone: string;
  password: string;
}

// Staff User
interface StaffSignupData {
  username: string;
  staff_name: string;
  email: string;
  password: string;
  role: string;
  business_id: string;
}

// Business Owner
interface BusinessSignupData {
  business_name: string;
  email: string;
  phone: string;
  password: string;
  description: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  x?: string;
}

interface LoginData {
  email: string;
  password: string;
  username: string;
}

interface VerifyOTPData {
  identifier: string;
  otp_code: string;
}

interface ResendOTPData {
  email: string;
  otp_type: "Registration" | "ForgotPassword" | "EmailVerification";
}

interface ForgotPasswordData {
  identifier: string;
}

interface ResetPasswordData {
  email: string;
  otp_code: string;
  new_password: string;
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

interface OTPResponse {
  message: string;
  success: boolean;
  token?: string;
}

interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

const authServices = {
  async login(data: LoginData): Promise<AuthResponse> {
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
        throw new Error(error.response.data.message || "Human owner signup failed");
      }
      throw new Error("Human owner signup failed");
    }
  },

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
        throw new Error(error.response.data.message || "Business signup failed");
      }
      throw new Error("Business signup failed");
    }
  },

  async verifyOTP(data: VerifyOTPData): Promise<OTPResponse> {
    try {
      const response: AxiosResponse<{ data: OTPResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/verify-otp`,
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
        throw new Error(error.response.data.message || "OTP verification failed");
      }
      throw new Error("OTP verification failed");
    }
  },

  async resendOTP(data: ResendOTPData): Promise<OTPResponse> {
    try {
      const response: AxiosResponse<{ data: OTPResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/resend-otp`,
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
        throw new Error(error.response.data.message || "OTP resend failed");
      }
      throw new Error("OTP resend failed");
    }
  },

  async forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
    try {
      const response: AxiosResponse<{ data: ForgotPasswordResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/forgot-password`,
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
        throw new Error(error.response.data.message || "Password reset request failed");
      }
      throw new Error("Password reset request failed");
    }
  },

  async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
    try {
      const response: AxiosResponse<{ data: ResetPasswordResponse }> = await axios.post(
        `${SERVER_BASE_URL}/api/v1/auth/reset-password`,
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
        throw new Error(error.response.data.message || "Password reset failed");
      }
      throw new Error("Password reset failed");
    }
  },
};

export default authServices;