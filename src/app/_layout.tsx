import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppBottomSheetRoot } from "../providers/AppBottomSheetProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { ToastProvider } from "../providers/ToastProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppBottomSheetRoot>
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tabs)" />
                </Stack>
              </AuthProvider>
            </QueryClientProvider>
          </ToastProvider>
        </AppBottomSheetRoot>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
