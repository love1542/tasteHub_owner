import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ToastService } from "../../../providers/ToastProvider";
import { useRegisterMutation, useVerifyOtpMutation } from "../../../services/hooks/useAuthMutations";
import type { AuthMethod } from "../types";
import { emailSchema, otpCodeSchema, passwordSchema, phoneNumberSchema } from "../validation";

type PhoneStep = "phone" | "otp";
type EmailStep = "details" | "otp";
type SignupAccountState = "identity" | "otp-verification";

export function useSignupFlow() {
  const [method, setMethod] = useState<AuthMethod>("email");
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("phone");
  const [emailStep, setEmailStep] = useState<EmailStep>("details");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const registerMutation = useRegisterMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const interval = setTimeout(() => {
      setResendCooldown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearTimeout(interval);
  }, [resendCooldown]);

  const resetForm = () => {
    setOtpCode("");
    setError("");
    setFeedback("");
    setResendCooldown(0);
  };

  const changeMethod = (nextMethod: AuthMethod) => {
    setMethod(nextMethod);
    setIdentity("");
    setPassword("");
    setOtpCode("");
    setPhoneStep("phone");
    setEmailStep("details");
    setError("");
    setFeedback("");
    setResendCooldown(0);
  };

  const changePhoneNumber = () => {
    setPhoneStep("phone");
    setOtpCode("");
    setError("");
    setFeedback("");
    setResendCooldown(0);
  };

  const changeSignupEmail = () => {
    setEmailStep("details");
    setOtpCode("");
    setError("");
    setFeedback("");
    setResendCooldown(0);
  };

  const resendCode = () => {
    if (resendCooldown > 0) return;

    setError("");
    setFeedback("Resending verification codes is not available yet.");
  };

  const handleOtpCodeChange = (value: string) => {
    setOtpCode(value);
    setError("");
    setFeedback("");
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setError("");
    setFeedback("");

    const identityValidation = (method === "email" ? emailSchema : phoneNumberSchema).safeParse(identity);
    if (!identityValidation.success) {
      setError(identityValidation.error.issues[0]?.message ?? "Enter a valid account identifier.");
      return;
    }

    if ((method === "email" && emailStep === "details") || (method === "phone" && phoneStep === "phone")) {
      const identifier = identityValidation.data;
      let registerPayload: { type: "email" | "phone"; identifier: string; password?: string };

      if (method === "email") {
        const passwordValidation = passwordSchema.safeParse(password);
        if (!passwordValidation.success) {
          setError(passwordValidation.error.issues[0]?.message ?? "Enter your password to continue.");
          return;
        }

        registerPayload = { type: "email", identifier, password: passwordValidation.data };
      } else {
        registerPayload = { type: "phone", identifier };
      }

      setIsSubmitting(true);
      try {
        const response = await registerMutation.mutateAsync(registerPayload);
        if (!response.success || !response.data?.user_id) {
          const message = response.message ?? "We couldn't start your registration.";
          setError(message);
          ToastService.show(message, "error");
          return;
        }

        setIdentity(identifier);
        setOtpCode("");
        setResendCooldown(30);
        setFeedback(response.message ?? "Verification code sent.");
        if (method === "email") setEmailStep("otp");
        else setPhoneStep("otp");
      } catch {
        const message = "Something went wrong. Please try again.";
        setError(message);
        ToastService.show(message, "error");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const otpValidation = otpCodeSchema.safeParse(otpCode);
    if (!otpValidation.success) {
      setError(otpValidation.error.issues[0]?.message ?? "Enter the complete 6-digit code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyOtpMutation.mutateAsync({
        type: method,
        identifier: identityValidation.data,
        otpCode: otpValidation.data,
        purpose: method === "email" ? "register_email" : "register_phone",
      });

      if (!response.success) {
        const message = response.message ?? "The verification code could not be confirmed.";
        setError(message);
        ToastService.show(message, "error");
        return;
      }

      if (!response.data?.access_token) {
        const message = "Verification succeeded, but the server did not return an access token.";
        setError(message);
        ToastService.show(message, "error");
        return;
      }

      router.push("/profile-setup");
    } catch {
      const message = "Something went wrong. Please try again.";
      setError(message);
      ToastService.show(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmailOtpStep = method === "email" && emailStep === "otp";
  const isPhoneOtpStep = method === "phone" && phoneStep === "otp";
  const accountState: SignupAccountState = isEmailOtpStep || isPhoneOtpStep ? "otp-verification" : "identity";
  const isIdentityLocked = accountState === "otp-verification";
  let submitTitle = "Continue";
  if (isPhoneOtpStep || isEmailOtpStep) {
    submitTitle = "Verify and create account";
  } else if (method === "phone") {
    submitTitle = "Continue with phone";
  }
  const title = isEmailOtpStep ? "Verify your email" : "Create your account";
  const subtitle = isEmailOtpStep
    ? `Enter the 6-digit verification code for ${identity}.`
    : "Set up your TasteHub owner profile.";

  return {
    method,
    identity,
    setIdentity,
    password,
    setPassword,
    otpCode,
    setOtpCode,
    handleOtpCodeChange,
    error,
    setError,
    feedback,
    setFeedback,
    isEmailOtpStep,
    isPhoneOtpStep,
    isSubmitting,
    resendCooldown,
    accountState,
    isIdentityLocked,
    title,
    subtitle,
    submitTitle,
    changeMethod,
    changePhoneNumber,
    changeSignupEmail,
    resendCode,
    handleSubmit,
    resetForm,
  };
}