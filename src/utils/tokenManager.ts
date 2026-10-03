import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "tastehub.accessToken";
const REFRESH_TOKEN_KEY = "tastehub.refreshToken";

export const TokenManager = {
  async getAccessToken(): Promise<string | null> {
    if (Platform.OS === "web") {
      return typeof localStorage === "undefined"
        ? null
        : localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  async saveAccessToken(token: string): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof localStorage === "undefined") {
        throw new Error("Local storage is unavailable.");
      }
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      return;
    }
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },

  async getRefreshToken(): Promise<string | null> {
    if (Platform.OS === "web") {
      throw new Error("Web refresh tokens must be managed with a secure HttpOnly cookie.");
    }
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  async saveRefreshToken(token: string): Promise<void> {
    if (Platform.OS === "web") {
      throw new Error("Web refresh tokens must be managed with a secure HttpOnly cookie.");
    }
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  },

  async clearTokens(): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
      return;
    }
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },
};