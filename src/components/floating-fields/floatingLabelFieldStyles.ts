import { StyleSheet } from "react-native";
import { PaletteColors } from "../../constants/colors";
import { LayoutScale } from "../../constants/layoutScales";
import { Typography } from "../../constants/typography";

export const floatingLabelFieldStyles = StyleSheet.create({
  field: {
    marginBottom: LayoutScale.ms_12,
  },
  shell: {
    height: LayoutScale.controlMD_44,
    borderWidth: 1,
    borderColor: PaletteColors.appD4D4D4,
    borderRadius: 4,
    backgroundColor: PaletteColors.white,
  },
  label: {
    position: "absolute",
    left: 10,
    top: -9,
    zIndex: 1,
    paddingHorizontal: 5,
    backgroundColor: PaletteColors.white,
    ...Typography.fieldLabel,
  },
});