import { Pressable, StyleSheet, Text, View } from "react-native";
import { PaletteColors } from "../constants/colors";
import { LayoutScale } from "../constants/layoutScales";
import { Typography } from "../constants/typography";

export type SegmentOption<T extends string = string> = {
  label: string;
  value: T;
};

type SegmentSwitcherProps<T extends string> = {
  value: T;
  options: readonly SegmentOption<T>[];
  onChange: (value: T) => void;
};

export function SegmentSwitcher<T extends string>({ value, options, onChange }: SegmentSwitcherProps<T>) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, isSelected && styles.selectedOption]}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: LayoutScale.xs_4,
    marginBottom: LayoutScale.ml_20,
    padding: LayoutScale.xs_4,
    borderRadius: 10,
    backgroundColor: PaletteColors.background,
  },
  option: {
    flex: 1,
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  selectedOption: {
    backgroundColor: PaletteColors.white,
  },
  label: {
    ...Typography.fieldLabel,
    color: PaletteColors.app737373,
  },
  selectedLabel: {
    color: PaletteColors.appPrimary2,
    fontWeight: "800",
  },
});