import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { PaletteColors } from "../constants/colors";
import { LayoutScale } from "../constants/layoutScales";
import { Typography } from "../constants/typography";

type OtpCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const CODE_LENGTH = 6;

export function OtpCodeInput({ value, onChange }: OtpCodeInputProps) {
  const inputs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  function handleChange(text: string, index: number) {
    const enteredDigits = text.replace(/\D/g, "");
    const nextDigits = value.split("");

    if (enteredDigits.length > 1) {
      for (const [offset, digit] of [...enteredDigits].entries()) {
        if (index + offset < CODE_LENGTH) nextDigits[index + offset] = digit;
      }
      onChange(nextDigits.join("").slice(0, CODE_LENGTH));
      const nextIndex = Math.min(index + enteredDigits.length, CODE_LENGTH - 1);
      inputs.current[nextIndex]?.focus();
      return;
    }

    if (enteredDigits) {
      nextDigits[index] = enteredDigits;
      onChange(nextDigits.join("").slice(0, CODE_LENGTH));
      if (index < CODE_LENGTH - 1) inputs.current[index + 1]?.focus();
    } else if (nextDigits[index]) {
      nextDigits.splice(index, 1);
      onChange(nextDigits.join(""));
    }
  }

  return (
    <View style={styles.row}>
      {Array.from({ length: CODE_LENGTH }, (_, index) => (
        <TextInput
          accessibilityLabel={`Verification code digit ${index + 1}`}
          autoCapitalize="none"
          autoCorrect={false}
          key={index}
          keyboardType="number-pad"
          maxLength={CODE_LENGTH}
          onBlur={() => setFocusedIndex(-1)}
          onChangeText={(text) => handleChange(text, index)}
          onFocus={() => setFocusedIndex(index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace" && !value[index] && index > 0) {
              inputs.current[index - 1]?.focus();
            }
          }}
          ref={(input) => { inputs.current[index] = input; }}
          selectTextOnFocus
          selectionColor={PaletteColors.appPrimary2}
          style={[styles.cell, focusedIndex === index && styles.focusedCell]}
          value={value[index] ?? ""}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: LayoutScale.sm_8,
  },
  cell: {
    flex: 1,
    height: LayoutScale.controlLG_56,
    borderWidth: 1,
    borderColor: PaletteColors.appD4D4D4,
    borderRadius: 9,
    backgroundColor: PaletteColors.white,
    ...Typography.otpDigit,
  },
  focusedCell: {
    borderWidth: 2,
    borderColor: PaletteColors.appPrimary2,
  },
});