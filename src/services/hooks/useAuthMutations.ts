import { authManager } from "@/services/managers/authManager";
import { useMutation } from "@tanstack/react-query";
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
import { TokenManager } from "../../utils/tokenManager";

const persistAccessToken = async (accessToken: string | undefined) => {
  if (accessToken) {
    await TokenManager.saveAccessToken(accessToken);
  }
};

export const useRegisterMutation = (options?: {
  onSuccess?: (data: ApiResponse<RegisterResponse>) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => authManager.register(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useCompleteRegistrationMutation = (options?: {
  onSuccess?: (data: ApiResponse<CompleteRegistrationResponse>) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: (payload: CompleteRegistrationRequest) => authManager.completeRegistration(payload),
    onSuccess: async (data) => {
      if (data.success) await persistAccessToken(data.data.access_token);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useLoginMutation = (options?: {
  onSuccess?: (data: ApiResponse<CompleteRegistrationResponse>) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => authManager.login(payload),
    onSuccess: async (data) => {
      if (data.success) await persistAccessToken(data.data.access_token);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useVerifyOtpMutation = (options?: {
  onSuccess?: (data: ApiResponse<OtpVerifyResponse>) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: (payload: OtpVerifyRequest) => authManager.verifyOtp(payload),
    onSuccess: async (data) => {
      if (data.success) await persistAccessToken(data.data.access_token);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useRefreshTokenMutation = (options?: {
  onSuccess?: (data: ApiResponse<CompleteRegistrationResponse>) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: (payload: RefreshTokenRequest) => authManager.refreshToken(payload),
    onSuccess: async (data) => {
      if (data.success) await persistAccessToken(data.data.access_token);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
