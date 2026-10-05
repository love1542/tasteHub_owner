import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PaletteColors } from "../constants/colors";
import { LayoutScale } from "../constants/layoutScales";
import { Typography } from "../constants/typography";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastRegistry = {
  setToast: null as ((toast: ToastItem | null) => void) | null,
};

export const ToastService = {
  show: (message: string, type: ToastType = "info") => {
    if (!toastRegistry.setToast) {
      return;
    }

    toastRegistry.setToast({ id: Date.now(), message, type });
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);

  useEffect(() => {
    toastRegistry.setToast = setToast;

    return () => {
      toastRegistry.setToast = null;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToast({ id: Date.now(), message, type });
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <View pointerEvents="none" style={styles.container}>
          <View style={[styles.toast, toast.type === "error" ? styles.error : toast.type === "success" ? styles.success : styles.info]}>
            <Text style={styles.text}>{toast.message}</Text>
          </View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  toast: {
    maxWidth: "85%",
    paddingVertical: LayoutScale.xs_4,
    paddingHorizontal: LayoutScale.md_16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  success: {
    backgroundColor: PaletteColors.green,
  },
  error: {
    backgroundColor: PaletteColors.red,
  },
  info: {
    backgroundColor: PaletteColors.app404040,
  },
  text: {
    ...Typography.caption,
    color: PaletteColors.white,
    fontWeight: "700",
  },
});
