import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaletteColors } from "../constants/colors";
import { LayoutScale, screenHorizontalPadding } from "../constants/layoutScales";

type ScreenContainerProps = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}>;

export function ScreenContainer({ children, contentStyle, scrollable = false }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {scrollable ? (
        <ScrollView contentContainerStyle={[styles.scrollContent, contentStyle]}>{children}</ScrollView>
      ) : (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PaletteColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: LayoutScale.lg_24,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: LayoutScale.lg_24,
  },
});