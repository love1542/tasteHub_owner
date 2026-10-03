import { Dimensions } from "react-native";

export const width = Dimensions.get("window").width;

export const LayoutScale = {
  nano_2: 2,
  xs_4: 4,
  xsm_6: 6,
  sm_8: 8,
  ms_12: 12,
  md_16: 16,
  ml_20: 20,
  lg_24: 24,
  xl_18: 18,
  xl_32: 32,
  xxl_40: 40,
  huge_48: 48,
  massive_64: 64,
  giant_80: 80,
  chip_24: 24,
  controlSM_36: 36,
  controlMD_44: 44,
  controlLG_56: 56,
  iconSM_16: 16,
  iconMD_24: 24,
  iconLG_32: 32,
  avatarSM_40: 40,
  avatarMD_70: 70,
  avtarBorder_60: 60,
  avatarLG_96: 96,
  bannerSM_100: 100,
  bannerLG_200: 170,
} as const;

export const screenHorizontalPadding = width < 360
  ? LayoutScale.md_16
  : LayoutScale.lg_24;

export type LayoutScaleType = typeof LayoutScale;