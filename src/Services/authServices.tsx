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

interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

interface VerifyOTPResponse {
  message: string;
  success: boolean;
  token?: string;
}

interface VerifyOTPData {
  identifier: string;
  otp_code: string;
}

type OTPType = "Registration" | "ForgotPassword" | "EmailVerification";

interface ResendOTPData {
  email: string;
  otp_type: OTPType;
}

interface ResendOTPResponse {
  message: string;
  success: boolean;
}

interface ResetPasswordData {
  email: string;
  otp_code: string;
  new_password: string;
}

interface ResetPasswordResponse {
  message: string;
  success: boolean;
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

  // Forgot Password
  async forgotPassword(identifier: string): Promise<ForgotPasswordResponse> {
    try {
      const response: AxiosResponse<{ data: ForgotPasswordResponse }> =
        await axios.post(
          `${SERVER_BASE_URL}/api/v1/auth/forgot-password`,
          { identifier },
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
          error.response.data.message || "Password reset request failed"
        );
      }
      throw new Error("Password reset request failed");
    }
  },

  // Verify OTP
  async verifyOTP(data: VerifyOTPData): Promise<VerifyOTPResponse> {
    try {
      const response: AxiosResponse<{ data: VerifyOTPResponse }> =
        await axios.post(`${SERVER_BASE_URL}/api/v1/auth/verify-otp`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (!response.data.data) {
        throw new Error("Invalid response from server");
      }
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        throw new Error("OTP verification failed");
      }
      throw new Error("OTP verification failed");
    }
  },

  // Resend OTP
  async resendOTP(data: ResendOTPData): Promise<ResendOTPResponse> {
    try {
      const response: AxiosResponse<{ data: ResendOTPResponse }> =
        await axios.post(`${SERVER_BASE_URL}/api/v1/auth/resend-otp`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (!response.data.data) {
        throw new Error("Invalid response from server");
      }
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        throw new Error("OTP resend failed");
      }
      throw new Error("OTP resend failed");
    }
  },

  // Reset Password
  async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
    try {
      const response: AxiosResponse<{ data: ResetPasswordResponse }> =
        await axios.post(
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
        throw new Error("Password reset failed");
      }
      throw new Error("Password reset failed");
    }
  },
};

export default authServices;
