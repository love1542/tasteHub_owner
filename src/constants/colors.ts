export const PaletteColors = {
  appFFE4D5: "#FFE4D5",
  appFFB88A: "#FFB88A",
  appPrimary2: "#D9480F",
  appPrimary: "#FF6B35",
  white: "#FFFFFF",
  black: "#000000",
  background: "#fcf1ec",
  appD4D4D4: "#D4D4D4",
  appA3A3A3: "#A3A3A3",
  app737373: "#737373",
  app525252: "#525252",
  app404040: "#404040",
  app262626: "#262626",
  green: "#22C55E",
  red: "#EF4444",
  yellow: "#F59E0B",
} as const;

export type palleteColorsType = typeof PaletteColors;
export type PaletteColor = palleteColorsType[keyof palleteColorsType];