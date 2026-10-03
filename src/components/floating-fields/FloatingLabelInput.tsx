import { useState } from "react";
import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import { PaletteColors } from "../../constants/colors";
import { LayoutScale } from "../../constants/layoutScales";
import { Typography } from "../../constants/typography";
import { floatingLabelFieldStyles } from "./floatingLabelFieldStyles";

type FloatingLabelInputProps = Omit<
  TextInputProps,
  | "accessibilityLabel"
  | "accessibilityState"
  | "onBlur"
  | "onChangeText"
  | "onFocus"
  | "style"
  | "value"
> & {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  status?: "success" | "warning";
  helperText?: string;
  error?: string;
};

export function FloatingLabelInput({
  label,
  value,
  onChangeText,
  status,
  helperText,
  error,
  placeholderTextColor = PaletteColors.appA3A3A3,
  ...inputProps
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const fieldStatus = error ? "error" : status;
  const statusColor = fieldStatus === "error"
    ? PaletteColors.red
    : fieldStatus === "success"
      ? PaletteColors.green
      : fieldStatus === "warning"
        ? PaletteColors.yellow
        : undefined;
  const statusMark = fieldStatus === "success" ? "✓" : fieldStatus ? "!" : undefined;

  return (
    <View style={floatingLabelFieldStyles.field}>
      <View
        style={[
          floatingLabelFieldStyles.shell,
          styles.inputShell,
          isFocused && styles.focusedShell,
          fieldStatus === "error" && styles.errorShell,
          fieldStatus === "success" && styles.successShell,
          fieldStatus === "warning" && styles.warningShell,
        ]}
      >
        <Text style={[floatingLabelFieldStyles.label, statusColor ? { color: statusColor } : null]}>
          {label}
        </Text>
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          accessibilityHint={error ?? helperText}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={placeholderTextColor}
          style={styles.input}
          value={value}
        />
        {statusMark ? (
          <View style={[styles.statusMark, { backgroundColor: statusColor }]}>
            <Text style={styles.statusMarkText}>{statusMark}</Text>
          </View>
        ) : null}
      </View>
      {error || helperText ? (
        <Text
          accessibilityRole={error ? "alert" : undefined}
          style={[styles.helper, statusColor ? { color: statusColor } : null]}
        >
          {error ?? helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputShell: {
    justifyContent: "center",
  },
  focusedShell: {
    borderColor: PaletteColors.appPrimary2,
  },
  errorShell: {
    borderColor: PaletteColors.red,
  },
  successShell: {
    borderColor: PaletteColors.green,
  },
  warningShell: {
    borderColor: PaletteColors.yellow,
  },
  input: {
    height: "100%",
    paddingHorizontal: 12,
    paddingRight: 42,
    paddingVertical: 0,
    ...Typography.input,
    textAlignVertical: "center",
  },
  statusMark: {
    position: "absolute",
    right: 11,
    width: 19,
    height: 19,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  statusMarkText: {
    color: PaletteColors.white,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
  },
  helper: {
    marginTop: LayoutScale.xs_4,
    color: PaletteColors.app737373,
    fontSize: 12,
  },
});