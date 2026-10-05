export type AuthMethod = "email" | "phone";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type RegisterRequest = {
  type: AuthMethod;
  identifier: string;
  password?: string;
};

export type RegisterResponse = {
  user_id: string;
};

type CompleteRegistrationBaseRequest = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  deviceId: string;
};

export type CompleteRegistrationRequest = CompleteRegistrationBaseRequest & (
  | { imageType: "default"; imageId: string; profileImage?: never }
  | { imageType: "upload"; profileImage: string; imageId?: never }
);

export type OtpVerifyRequest = {
  type: AuthMethod;
  identifier: string;
  otpCode: string;
  purpose: "register_email" | "register_phone";
};

export type OtpVerifyResponse = {
  access_token: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type CompleteRegistrationResponse = {
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    email?: string;
    phone?: string;
    fullName?: string;
  };
};

