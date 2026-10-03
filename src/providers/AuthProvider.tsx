import { createContext, useContext, useEffect, useState } from "react";
import { TokenManager } from "../utils/tokenManager";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const DEMO_ACCESS_TOKEN = "signin-token";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const accessToken = await TokenManager.getAccessToken();
        if (isMounted) setIsAuthenticated(Boolean(accessToken));
      } catch {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function signIn() {
    await TokenManager.saveAccessToken(DEMO_ACCESS_TOKEN);
    setIsAuthenticated(true);
  }

  async function signOut() {
    await TokenManager.clearTokens();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}