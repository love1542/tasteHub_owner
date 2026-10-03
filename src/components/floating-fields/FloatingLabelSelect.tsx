import { Pressable, StyleSheet, Text, View } from "react-native";
import { PaletteColors } from "../../constants/colors";
import { LayoutScale } from "../../constants/layoutScales";
import { Typography } from "../../constants/typography";
import { useAppBottomSheet } from "../../providers/AppBottomSheetProvider";
import { floatingLabelFieldStyles } from "./floatingLabelFieldStyles";

type FloatingLabelSelectProps = {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

export function FloatingLabelSelect({ label, value, options, onChange }: FloatingLabelSelectProps) {
  const { open, close } = useAppBottomSheet();

  const selectOption = (option: string) => {
    onChange(option);
    close();
  };

  const openOptions = () => {
    open({
      title: label,
      snapPoints: ["55%"],
      initialIndex: 0,
      enablePanDownToClose: true,
      content: (
        <View style={styles.options}>
          {options.map((option) => (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: option === value }}
              key={option}
              onPress={() => selectOption(option)}
              style={[styles.option, option === value && styles.selectedOption]}
            >
              <Text style={[styles.optionText, option === value && styles.selectedOptionText]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      ),
    });
  };

  return (
    <View style={floatingLabelFieldStyles.field}>
      <Pressable
        accessibilityHint={`Choose ${label.toLowerCase()}`}
        accessibilityLabel={label}
        accessibilityRole="button"
        onPress={openOptions}
        style={[floatingLabelFieldStyles.shell, styles.inputShell]}
      >
        <Text style={floatingLabelFieldStyles.label}>{label}</Text>
        <Text style={[styles.value, !value && styles.placeholder]}>{value || "Select"}</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputShell: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    flex: 1,
    paddingLeft: 12,
    ...Typography.input,
    color: PaletteColors.app404040,
  },
  placeholder: {
    color: PaletteColors.appA3A3A3,
  },
  arrow: {
    paddingHorizontal: 13,
    color: PaletteColors.app737373,
    fontSize: 24,
    lineHeight: 28,
  },
  options: {
    paddingBottom: LayoutScale.sm_8,
  },
  option: {
    minHeight: LayoutScale.controlMD_44,
    justifyContent: "center",
    paddingHorizontal: LayoutScale.sm_8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: PaletteColors.appD4D4D4,
  },
  selectedOption: {
    backgroundColor: PaletteColors.background,
  },
  optionText: {
    ...Typography.input,
    color: PaletteColors.app404040,
  },
  selectedOptionText: {
    color: PaletteColors.appPrimary2,
    fontWeight: "700",
  },
});