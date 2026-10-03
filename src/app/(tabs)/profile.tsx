import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActionButton } from "../../components/ActionButton";
import { PageHeader } from "../../components/PageHeader";
import { ScreenContainer } from "../../components/ScreenContainer";
import { LayoutScale } from "../../constants/layoutScales";
import { useAuth } from "../../providers/AuthProvider";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await signOut();
      router.replace("/login");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <ScreenContainer contentStyle={styles.container}>
      <PageHeader eyebrow="ACCOUNT" title="Profile" />
      <View style={styles.actions}>
        <ActionButton
          disabled={isSigningOut}
          onPress={() => void handleSignOut()}
          title={isSigningOut ? "Signing out..." : "Sign out"}
          trailingLabel="→"
          variant="danger"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: LayoutScale.lg_24,
  },
  actions: {
    marginTop: LayoutScale.lg_24,
  },
});