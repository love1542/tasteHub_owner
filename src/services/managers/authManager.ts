import type {
  ApiResponse,
  CompleteRegistrationRequest,
  CompleteRegistrationResponse,
  OtpVerifyRequest,
  OtpVerifyResponse,
  RefreshTokenRequest,
  RegisterRequest,
  RegisterResponse,
} from "../../dto/auth.dto";
import { ApiClient } from "../apiClient";
import { END_POINT } from "../endPoint";

export type AuthManagerType = {
  register: (data: RegisterRequest) => Promise<ApiResponse<RegisterResponse>>;
  verifyOtp: (request: OtpVerifyRequest) => Promise<ApiResponse<OtpVerifyResponse>>;
  completeRegistration: (request: CompleteRegistrationRequest) => Promise<ApiResponse<CompleteRegistrationResponse>>;
  login: (request: RegisterRequest) => Promise<ApiResponse<CompleteRegistrationResponse>>;
  refreshToken: (request: RefreshTokenRequest) => Promise<ApiResponse<CompleteRegistrationResponse>>;
};

export const authManager: AuthManagerType = {
  register: async (data) => {
    const response = await ApiClient.post<ApiResponse<RegisterResponse>>(END_POINT.auth.register, data);
    return response.data;
  },

  verifyOtp: async (request) => {
    const response = await ApiClient.post<ApiResponse<OtpVerifyResponse>>(END_POINT.auth.otpVerify, request);
    return response.data;
  },

  completeRegistration: async (request) => {
    const form = new FormData();
    form.append("fullName", request.fullName);
    form.append("dateOfBirth", request.dateOfBirth);
    form.append("gender", request.gender);
    form.append("deviceId", request.deviceId);
    form.append("imageType", request.imageType);

    if (request.imageType === "default") {
      form.append("imageId", request.imageId);
    } else {
      form.append(
        "profileImage",
        {
          uri: request.profileImage,
          type: "image/jpeg",
          name: "profile.jpg",
        } as unknown as Blob,
      );
    }

    const response = await ApiClient.post<ApiResponse<CompleteRegistrationResponse>>(
      END_POINT.auth.completeRegistration,
      form,
    );
    return response.data;
  },

  login: async (request) => {
    const response = await ApiClient.post<ApiResponse<CompleteRegistrationResponse>>(END_POINT.auth.login, request);
    return response.data;
  },

  refreshToken: async (request) => {
    const response = await ApiClient.post<ApiResponse<CompleteRegistrationResponse>>(
      END_POINT.auth.refreshToken,
      request,
    );
    return response.data;
  },
};
