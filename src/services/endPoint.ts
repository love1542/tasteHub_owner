export const END_POINT = {
  auth: {
    register: "auth/register",
    completeRegistration: "auth/complete-registration",
    login: "auth/login",
    otpVerify: "auth/verify-otp",
    refreshToken: "auth/refresh-token",
  },
} as const;
