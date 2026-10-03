import { useState } from "react";
import { emailSchema, otpCodeSchema, passwordResetSchema } from "../validation";

type RecoveryStep = "email" | "otp" | "password";

const recoveryCopy: Record<RecoveryStep, { title: string; subtitle: string; submitTitle: string }> = {
  email: {
    title: "Reset your password",
    subtitle: "Enter the email linked to your owner account.",
    submitTitle: "Send recovery code",
  },
  otp: {
    title: "Verify your email",
    subtitle: "Enter the 6-digit recovery code for your email.",
    submitTitle: "Verify code",
  },
  password: {
    title: "Create a new password",
    subtitle: "Choose a new password and confirm it.",
    submitTitle: "Update password",
  },
};

export function useRecoveryFlow() {
  const [step, setStep] = useState<RecoveryStep>("email");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const changeRecoveryEmail = () => {
    setStep("email");
    setOtpCode("");
    setError("");
    setFeedback("");
  };

  const resendRecoveryCode = () => {
    setOtpCode("");
    setFeedback("Code delivery is not connected yet; this recovery flow is UI-only.");
  };

  const handleSubmit = () => {
    setError("");
    setFeedback("");

    const identityValidation = emailSchema.safeParse(identity);
    if (!identityValidation.success) {
      setError(identityValidation.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    if (step === "email") {
      setStep("otp");
      setFeedback("Email delivery is not connected yet; this is a UI preview.");
      return;
    }

    if (step === "otp") {
      const otpValidation = otpCodeSchema.safeParse(otpCode);
      if (!otpValidation.success) {
        setError(otpValidation.error.issues[0]?.message ?? "Enter the complete 6-digit code.");
        return;
      }
      setStep("password");
      setOtpCode("");
      setFeedback("OTP verification is not connected yet; this is a UI preview.");
      return;
    }

    const passwordValidation = passwordResetSchema.safeParse({ password, confirmPassword });
    if (!passwordValidation.success) {
      setError(passwordValidation.error.issues[0]?.message ?? "Check your new password.");
      return;
    }
    setFeedback("Password reset is not connected to an account service; no password was changed.");
  };

  return {
    step,
    identity,
    setIdentity,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    otpCode,
    setOtpCode,
    error,
    feedback,
    ...recoveryCopy[step],
    changeRecoveryEmail,
    resendRecoveryCode,
    handleSubmit,
  };
}