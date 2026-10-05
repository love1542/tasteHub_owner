import { Redirect, Stack } from "expo-router";
import { AppSplash } from "../../components/AppSplash";
import { useAuth } from "../../providers/AuthProvider";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <AppSplash />;
  if (isAuthenticated) return <Redirect href="/(tabs)" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}