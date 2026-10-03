import { StyleSheet, Text } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Typography } from "../../constants/typography";

export default function HomeScreen() {
  return (
    <ScreenContainer contentStyle={styles.center}>
      <Text style={styles.label}>Home screen</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    ...Typography.screenLabel,
  },
});