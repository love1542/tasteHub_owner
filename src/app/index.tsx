import { router } from "expo-router";
import { useEffect, useState } from "react";
import { AppSplash } from "../components/AppSplash";
import { useAuth } from "../providers/AuthProvider";

const MINIMUM_SPLASH_DURATION_MS = 1500;

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasSplashElapsed, setHasSplashElapsed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasSplashElapsed(true), MINIMUM_SPLASH_DURATION_MS);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoading || !hasSplashElapsed) return;
    router.replace(isAuthenticated ? "/" : "/login");
  }, [hasSplashElapsed, isAuthenticated, isLoading]);

  return <AppSplash />;
}