import { Image, ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useState, type ComponentType } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaletteColors } from "../../constants/colors";
import { LayoutScale, screenHorizontalPadding } from "../../constants/layoutScales";
import { Typography } from "../../constants/typography";
import type { AuthFlow } from "../../features/auth/types";
import { LoginFlowView } from "../../features/auth/views/LoginFlowView";
import { RecoveryFlowView } from "../../features/auth/views/RecoveryFlowView";
import { SignupFlowView } from "../../features/auth/views/SignupFlowView";

export type AuthFlowViewProps = {
  onChangeFlow: (flow: AuthFlow) => void;
};

const authFlowViews: Record<AuthFlow, ComponentType<AuthFlowViewProps>> = {
  login: LoginFlowView,
  signup: SignupFlowView,
  forgot: RecoveryFlowView,
};

export default function LoginScreen() {
  const [flow, setFlow] = useState<AuthFlow>("login");
  const ActiveFlowView = authFlowViews[flow];

  return (
    <ImageBackground
      contentFit="cover"
      source={require("../../../assets/images/app/splash/splash_bg.png")}
      style={styles.screenBackground}
    >
      <StatusBar style="light" />
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <Image
              accessibilityLabel="TasteHub app icon"
              contentFit="contain"
              source={require("../../../assets/images/app/icon/appIcon.png")}
              style={styles.appIcon}
            />
            <View>
              <Text style={styles.brandName}>TasteHub</Text>
              <Text style={styles.brandCaption}>RESTAURANT OWNER</Text>
            </View>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>YOUR RESTAURANT, AT A GLANCE</Text>
            <Text style={styles.heroTitle}>Good food.{"\n"}Strong business.</Text>
          </View>
        </View>

        <View style={styles.sheet}>
          <ScrollView
            contentContainerStyle={styles.sheetContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ActiveFlowView onChangeFlow={setFlow} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  hero: {
    height: "40%",
    justifyContent: "space-between",
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: LayoutScale.md_16,
    paddingBottom: LayoutScale.huge_48,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: LayoutScale.ms_12,
  },
  appIcon: {
    width: 58,
    height: 68,
  },
  brandName: {
    ...Typography.mdTitle,
    color: PaletteColors.white,
    fontWeight: "900",
  },
  brandCaption: {
    ...Typography.caption,
    marginTop: LayoutScale.xs_4,
    color: PaletteColors.appFFE4D5,
    fontWeight: "700",
  },
  heroCopy: {
    gap: 8,
  },
  heroEyebrow: {
    ...Typography.eyebrow,
    color: PaletteColors.white,
  },
  heroTitle: {
    ...Typography.largeheading,
    color: PaletteColors.white,
    fontWeight: "800",
  },
  sheet: {
    flex: 1,
    minHeight: 0,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: PaletteColors.white,
  },
  sheetContent: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: LayoutScale.ml_20,
    paddingBottom: LayoutScale.xl_32,
  },
});