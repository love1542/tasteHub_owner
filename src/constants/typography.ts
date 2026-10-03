import type { TextStyle, ViewStyle } from "react-native";
import { PaletteColors } from "./colors";
import { LayoutScale } from "./layoutScales";

const primaryTextColor = {
  color: PaletteColors.app262626,
} satisfies TextStyle;

const mutedTextColor = {
  color: PaletteColors.app737373,
} satisfies TextStyle;

const standardTitleBase = {
  ...primaryTextColor,
  fontSize: 15,
} satisfies TextStyle;

const fullWidthLine = {
  width: "100%",
} satisfies ViewStyle;

export const Typography = {
  largeheading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
  } satisfies TextStyle,
  subHeading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
  } satisfies TextStyle,
  mdTitle: {
    ...primaryTextColor,
    fontSize: 18,
    fontWeight: "700",
  } satisfies TextStyle,
  title: {
    ...standardTitleBase,
    fontWeight: "500",
  } satisfies TextStyle,
  subtitle: {
    ...mutedTextColor,
    fontSize: 14,
    fontWeight: "500",
  } satisfies TextStyle,
  eyebrow: {
    fontSize: 10,
    color: PaletteColors.appPrimary2,
    fontWeight: "800",
    letterSpacing: 1.2,
  } satisfies TextStyle,
  fieldLabel: {
    fontSize: 13,
    color: PaletteColors.app404040,
    fontWeight: "500",
  } satisfies TextStyle,
  input: {
    ...primaryTextColor,
    fontSize: 16,
  } satisfies TextStyle,
  buttonTitle: {
    ...standardTitleBase,
    fontWeight: "700",
  } satisfies TextStyle,
  caption: {
    ...mutedTextColor,
    fontSize: 12,
  } satisfies TextStyle,
  screenLabel: {
    ...primaryTextColor,
    fontSize: 20,
    fontWeight: "600",
  } satisfies TextStyle,
  otpDigit: {
    ...primaryTextColor,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  } satisfies TextStyle,
  borderLine: {
    ...fullWidthLine,
    height: 1,
    backgroundColor: PaletteColors.appD4D4D4,
  } satisfies ViewStyle,
  focusFiledBorder: {
    ...fullWidthLine,
    height: 3,
    backgroundColor: PaletteColors.appPrimary,
  } satisfies ViewStyle,
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: LayoutScale.xsm_6,
  } satisfies ViewStyle,
  shadowCard: {
    padding: LayoutScale.ms_12,
    backgroundColor: PaletteColors.white,
    borderWidth: 1,
    borderColor: PaletteColors.appD4D4D4,
    borderRadius: 25,
    shadowColor: PaletteColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: LayoutScale.sm_8,
    elevation: 3,
  } satisfies ViewStyle,
} as const;

export type TypographyType = typeof Typography;