import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppBottomSheetRoot } from "../providers/AppBottomSheetProvider";
import { AuthProvider } from "../providers/AuthProvider";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppBottomSheetRoot>
          <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </AuthProvider>
        </AppBottomSheetRoot>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
