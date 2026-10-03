import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../../../components/ActionButton";
import { OtpCodeInput } from "../../../components/OtpCodeInput";
import { PaletteColors } from "../../../constants/colors";
import { LayoutScale } from "../../../constants/layoutScales";
import { Typography } from "../../../constants/typography";

type AuthFlowContentProps = {
  title: string;
  subtitle: string;
  error: string;
  feedback: string;
  isSubmitting: boolean;
  submitTitle: string;
  footerPrompt: string;
  footerAction: string;
  onSubmit: () => void;
  onFooterAction: () => void;
  children: ReactNode;
};

type OtpSectionProps = {
  title: string;
  subtitle: string;
  value: string;
  onChange: (value: string) => void;
  actions: ReactNode;
};

export function AuthFlowContent({
  title,
  subtitle,
  error,
  feedback,
  isSubmitting,
  submitTitle,
  footerPrompt,
  footerAction,
  onSubmit,
  onFooterAction,
  children,
}: AuthFlowContentProps) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      {feedback ? <Text accessibilityRole="alert" style={styles.feedback}>{feedback}</Text> : null}
      <ActionButton
        disabled={isSubmitting}
        onPress={onSubmit}
        title={submitTitle}
        trailingLabel="→"
      />
      <View style={styles.footer}>
        <Text style={styles.footerPrompt}>{footerPrompt}</Text>
        <AuthLink label={footerAction} onPress={onFooterAction} />
      </View>
    </>
  );
}

export function OtpSection({ title, subtitle, value, onChange, actions }: OtpSectionProps) {
  return (
    <View style={styles.otpSection}>
      <Text style={styles.otpTitle}>{title}</Text>
      <Text style={styles.otpSubtitle}>{subtitle}</Text>
      <OtpCodeInput value={value} onChange={onChange} />
      <View style={styles.otpActions}>{actions}</View>
    </View>
  );
}

export function AuthLink({
  label,
  onPress,
  alignRight = false,
}: {
  label: string;
  onPress: () => void;
  alignRight?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={alignRight ? styles.rightAlignedLink : undefined}
    >
      <Text style={styles.actionLink}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.subHeading,
    fontWeight: "800",
  },
  subtitle: {
    ...Typography.subtitle,
    marginTop: LayoutScale.xs_4,
    marginBottom: LayoutScale.ml_20,
  },
  otpSection: {
    marginBottom: LayoutScale.md_16,
  },
  otpTitle: {
    ...Typography.title,
    color: PaletteColors.app404040,
    fontWeight: "700",
  },
  otpSubtitle: {
    marginTop: LayoutScale.xs_4,
    marginBottom: LayoutScale.ms_12,
    color: PaletteColors.app737373,
    fontSize: 13,
  },
  otpActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: LayoutScale.ms_12,
  },
  actionLink: {
    ...Typography.buttonTitle,
    color: PaletteColors.appPrimary2,
    fontSize: 13,
  },
  rightAlignedLink: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: LayoutScale.md_16,
  },
  error: {
    marginTop: -2,
    marginBottom: 12,
    color: PaletteColors.red,
    fontSize: 12,
  },
  feedback: {
    marginTop: -2,
    marginBottom: 12,
    color: PaletteColors.app525252,
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 20,
  },
  footerPrompt: {
    color: PaletteColors.app737373,
    fontSize: 12,
  },
});