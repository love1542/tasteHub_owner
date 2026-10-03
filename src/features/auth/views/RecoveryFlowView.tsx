import { AuthFlowViewProps } from "@/app/(auth)/login";
import { FloatingLabelInput } from "../../../components/floating-fields";
import { useRecoveryFlow } from "../hooks/useRecoveryFlow";
import { AuthFlowContent, AuthLink, OtpSection } from "./AuthFlowContent";

export function RecoveryFlowView({ onChangeFlow }: AuthFlowViewProps) {
  const {
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
    title,
    subtitle,
    submitTitle,
    changeRecoveryEmail,
    resendRecoveryCode,
    handleSubmit,
  } = useRecoveryFlow();

  return (
    <AuthFlowContent
      error={error}
      feedback={feedback}
      footerAction="Sign in"
      footerPrompt="Remembered your password?"
      isSubmitting={false}
      onFooterAction={() => onChangeFlow("login")}
      onSubmit={handleSubmit}
      submitTitle={submitTitle}
      subtitle={subtitle}
      title={title}
    >
      {step === "email" ? (
        <FloatingLabelInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email address"
          onChangeText={setIdentity}
          placeholder="you@restaurant.com"
          value={identity}
        />
      ) : null}
      {step === "otp" ? (
        <OtpSection
          actions={(
            <>
              <AuthLink label="Change email" onPress={changeRecoveryEmail} />
              <AuthLink label="Resend code" onPress={resendRecoveryCode} />
            </>
          )}
          onChange={setOtpCode}
          subtitle="Email delivery is not connected yet."
          title="Enter your recovery code"
          value={otpCode}
        />
      ) : null}
      {step === "password" ? (
        <>
          <FloatingLabelInput
            autoComplete="new-password"
            label="New password"
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
            placeholder="Enter a new password"
            secureTextEntry
            value={password}
          />
          <FloatingLabelInput
            autoComplete="new-password"
            label="Confirm new password"
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
            placeholder="Re-enter your new password"
            secureTextEntry
            value={confirmPassword}
          />
        </>
      ) : null}
    </AuthFlowContent>
  );
}