import { AuthFlowViewProps } from "@/app/(auth)/login";
import { FloatingLabelInput } from "../../../components/floating-fields";
import { SegmentSwitcher, type SegmentOption } from "../../../components/SegmentSwitcher";
import { useSignupFlow } from "../hooks/useSignupFlow";
import type { AuthMethod } from "../types";
import { AuthFlowContent, AuthLink, OtpSection } from "./AuthFlowContent";

const methodOptions: SegmentOption<AuthMethod>[] = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
];

export function SignupFlowView({ onChangeFlow }: AuthFlowViewProps) {
  const {
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
    isEmailOtpStep,
    isPhoneOtpStep,
    isSubmitting,
    resendCooldown,
    isIdentityLocked,
    title,
    subtitle,
    submitTitle,
    changeMethod,
    changePhoneNumber,
    changeSignupEmail,
    resendCode,
    handleSubmit,
  } = useSignupFlow();

  return (
    <AuthFlowContent
      error={error}
      feedback={feedback}
      footerAction="Sign in"
      footerPrompt="Already have an account?"
      isSubmitting={isSubmitting}
      onFooterAction={() => onChangeFlow("login")}
      onSubmit={() => void handleSubmit()}
      submitTitle={submitTitle}
      subtitle={subtitle}
      title={title}
    >
      <SegmentSwitcher options={methodOptions} value={method} onChange={changeMethod} />
      {!isEmailOtpStep && !isPhoneOtpStep ? (
        <FloatingLabelInput
          autoCapitalize="none"
          autoComplete={method === "email" ? "email" : "tel"}
          editable={!isIdentityLocked}
          keyboardType={method === "email" ? "email-address" : "phone-pad"}
          label={method === "email" ? "Email address" : "Phone number"}
          onChangeText={(value) => {
            setError("");
            setIdentity(value);
          }}
          placeholder={method === "email" ? "you@restaurant.com" : "9786745321"}
          value={identity}
        />
      ) : null}
      {isEmailOtpStep || isPhoneOtpStep ? (
        <OtpSection
          actions={(
            <>
              {isEmailOtpStep ? (
                <AuthLink label="Change email" onPress={changeSignupEmail} />
              ) : (
                <AuthLink label="Change number" onPress={changePhoneNumber} />
              )}
              <AuthLink
                label={resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : "Resend code"}
                onPress={() => {
                  if (resendCooldown === 0) {
                    resendCode();
                  }
                }}
              />
            </>
          )}
          onChange={setOtpCode}
          subtitle={isEmailOtpStep
            ? "Email delivery is not connected yet; this is a UI preview."
            : `6-digit code for ${identity}`}
          title="Enter your verification code"
          value={otpCode}
        />
      ) : null}
      {method === "email" && !isEmailOtpStep ? (
        <FloatingLabelInput
          autoComplete="new-password"
          label="Create password"
          onChangeText={(value) => {
            setError("");
            setPassword(value);
          }}
          onSubmitEditing={() => void handleSubmit()}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
        />
      ) : null}
    </AuthFlowContent>
  );
}