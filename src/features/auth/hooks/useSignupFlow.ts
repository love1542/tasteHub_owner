import { router } from "expo-router";
import { useEffect, useState } from "react";
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

    setOtpCode("");
    setError("");
    setResendCooldown(30);
    setFeedback(method === "email" ? "Email delivery is not connected yet; this is a UI preview." : "A new demo code is ready.");
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

    if (method === "email" && emailStep === "details") {
      const passwordValidation = passwordSchema.safeParse(password);
      if (!passwordValidation.success) {
        setError(passwordValidation.error.issues[0]?.message ?? "Enter your password to continue.");
        return;
      }
      setEmailStep("otp");
      setOtpCode("");
      setResendCooldown(30);
      setFeedback("Email delivery is not connected yet; this is a UI preview.");
      return;
    }

    if (method === "phone" && phoneStep === "phone") {
      setPhoneStep("otp");
      setOtpCode("");
      setResendCooldown(30);
      setFeedback("A new demo code is ready.");
      return;
    }

    const otpValidation = otpCodeSchema.safeParse(otpCode);
    if (!otpValidation.success) {
      setError(otpValidation.error.issues[0]?.message ?? "Enter the complete 6-digit code.");
      return;
    }

    setIsSubmitting(true);
    try {
      router.push("/profile-setup");
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