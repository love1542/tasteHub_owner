import { Image, ImageBackground } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { PaletteColors } from "../constants/colors";
import { LayoutScale } from "../constants/layoutScales";
import { Typography } from "../constants/typography";

export function AppSplash() {
  return (
    <ImageBackground
      contentFit="cover"
      source={require("../../assets/images/app/splash/splash_bg.png")}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          accessibilityLabel="TasteHub pizza app icon"
          contentFit="contain"
          source={require("../../assets/images/app/icon/appIcon.png")}
          style={styles.icon}
        />
        <Text style={styles.name}>TasteHub</Text>
        <Text style={styles.caption}>OWNER</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 150,
    height: 178,
  },
  name: {
    marginTop: LayoutScale.md_16,
    color: PaletteColors.white,
    fontSize: 28,
    fontWeight: "700",
  },
  caption: {
    ...Typography.caption,
    marginTop: LayoutScale.xsm_6,
    color: PaletteColors.appFFE4D5,
    fontWeight: "700",
  },
});