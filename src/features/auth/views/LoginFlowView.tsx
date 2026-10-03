import { AuthFlowViewProps } from "@/app/(auth)/login";
import { FloatingLabelInput } from "../../../components/floating-fields";
import { SegmentSwitcher, type SegmentOption } from "../../../components/SegmentSwitcher";
import { useLoginFlow } from "../hooks/useLoginFlow";
import type { AuthMethod } from "../types";
import { AuthFlowContent, AuthLink, OtpSection } from "./AuthFlowContent";

const methodOptions: SegmentOption<AuthMethod>[] = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
];

export function LoginFlowView({ onChangeFlow }: AuthFlowViewProps) {
  const {
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
  } = useLoginFlow();

  return (
    <AuthFlowContent
      error={error}
      feedback={feedback}
      footerAction="Create account"
      footerPrompt="New to TasteHub?"
      isSubmitting={isSubmitting}
      onFooterAction={() => onChangeFlow("signup")}
      onSubmit={() => void handleSubmit()}
      submitTitle={submitTitle}
      subtitle="Sign in to keep your restaurant moving."
      title="Welcome back"
    >
      <SegmentSwitcher options={methodOptions} value={method} onChange={changeMethod} />
      <FloatingLabelInput
        autoCapitalize="none"
        autoComplete={method === "email" ? "email" : "tel"}
        keyboardType={method === "email" ? "email-address" : "phone-pad"}
        label={method === "email" ? "Email address" : "Phone number"}
        onChangeText={setIdentity}
        placeholder={method === "email" ? "you@restaurant.com" : "9786745321"}
        value={identity}
      />
      {method === "phone" && isPhoneOtpStep ? (
        <OtpSection
          actions={(
            <>
              <AuthLink label="Change number" onPress={changePhoneNumber} />
              <AuthLink label="Resend code" onPress={resendCode} />
            </>
          )}
          onChange={setOtpCode}
          subtitle={`6-digit code for ${identity}`}
          title="Enter your verification code"
          value={otpCode}
        />
      ) : null}
      {method === "email" ? (
        <>
          <FloatingLabelInput
            autoComplete="password"
            label="Password"
            onChangeText={setPassword}
            onSubmitEditing={() => void handleSubmit()}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
          />
          <AuthLink
            alignRight
            label="Forgot password?"
            onPress={() => onChangeFlow("forgot")}
          />
        </>
      ) : null}
    </AuthFlowContent>
  );
}