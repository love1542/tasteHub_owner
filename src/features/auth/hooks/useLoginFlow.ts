import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import { useState } from "react";
import { AuthMethod } from "../types";
import { emailSchema, otpCodeSchema, passwordSchema, phoneNumberSchema } from "../validation";

type PhoneStep = "phone" | "otp";

export function useLoginFlow() {
  const { signIn } = useAuth();
  const [method, setMethod] = useState<AuthMethod>("email");
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("phone");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeMethod = (nextMethod: AuthMethod) => {
    setMethod(nextMethod);
    setIdentity("");
    setPassword("");
    setOtpCode("");
    setPhoneStep("phone");
    setError("");
    setFeedback("");
  };

  const changePhoneNumber = () => {
    setPhoneStep("phone");
    setOtpCode("");
    setError("");
    setFeedback("");
  };

  const resendCode = () => {
    setOtpCode("");
    setFeedback("A new demo code is ready.");
  };

  const handleSubmit = async () => {
    setError("");
    setFeedback("");

    const identityValidation = (method === "email" ? emailSchema : phoneNumberSchema).safeParse(identity);
    if (!identityValidation.success) {
      setError(identityValidation.error.issues[0]?.message ?? "Enter a valid account identifier.");
      return;
    }

    if (method === "phone" && phoneStep === "phone") {
      setPhoneStep("otp");
      setOtpCode("");
      return;
    }

    if (method === "phone") {
      const otpValidation = otpCodeSchema.safeParse(otpCode);
      if (!otpValidation.success) {
        setError(otpValidation.error.issues[0]?.message ?? "Enter the complete 6-digit code.");
        return;
      }
    } else {
      const passwordValidation = passwordSchema.safeParse(password);
      if (!passwordValidation.success) {
        setError(passwordValidation.error.issues[0]?.message ?? "Enter your password to continue.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await signIn();
      router.replace("/");
    } catch {
      setError("Unable to continue right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPhoneOtpStep = method === "phone" && phoneStep === "otp";
  const submitTitle = isSubmitting
    ? "Please wait..."
    : method === "phone"
      ? isPhoneOtpStep ? "Verify and sign in" : "Continue with phone"
      : "Sign in";

  return {
    method,
    identity,
    setIdentity,
    password,
    setPassword,
    otpCode,
    setOtpCode,
    error,
    feedback,
    isSubmitting,
    isPhoneOtpStep,
    submitTitle,
    changeMethod,
    changePhoneNumber,
    resendCode,
    handleSubmit,
  };
}