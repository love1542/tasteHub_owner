import { Pressable, StyleSheet, Text } from "react-native";
import { PaletteColors } from "../constants/colors";
import { LayoutScale } from "../constants/layoutScales";
import { Typography } from "../constants/typography";

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  trailingLabel?: string;
  disabled?: boolean;
  variant?: "primary" | "danger";
};

export function ActionButton({
  title,
  onPress,
  trailingLabel,
  disabled = false,
  variant = "primary",
}: ActionButtonProps) {
  const isDanger = variant === "danger";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isDanger ? styles.dangerButton : styles.primaryButton,
        isDanger && styles.spreadContent,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.title, isDanger ? styles.dangerTitle : styles.primaryTitle]}>{title}</Text>
      {trailingLabel ? (
        <Text style={[styles.trailingLabel, isDanger ? styles.dangerTitle : styles.primaryTitle]}>
          {trailingLabel}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: LayoutScale.controlLG_56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: LayoutScale.sm_8,
    paddingHorizontal: LayoutScale.md_16,
    borderRadius: 10,
  },
  primaryButton: {
    backgroundColor: PaletteColors.appPrimary,
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: PaletteColors.appD4D4D4,
    backgroundColor: PaletteColors.white,
  },
  spreadContent: {
    justifyContent: "space-between",
  },
  title: {
    ...Typography.buttonTitle,
  },
  primaryTitle: {
    color: PaletteColors.white,
  },
  dangerTitle: {
    color: PaletteColors.red,
  },
  trailingLabel: {
    fontSize: 20,
  },
  pressed: {
    opacity: 0.82,
  },
  disabled: {
    opacity: 0.55,
  },
});