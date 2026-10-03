import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
    type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { createContext, useContext, useEffect, useRef, useState, type ElementRef, type PropsWithChildren, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaletteColors } from "../constants/colors";
import { LayoutScale } from "../constants/layoutScales";

export type AppBottomSheetConfig = {
  content: ReactNode;
  title?: string;
  snapPoints?: readonly (string | number)[];
  initialIndex?: number;
  enablePanDownToClose?: boolean;
  onClose?: () => void;
};

type ActiveBottomSheetConfig = AppBottomSheetConfig & {
  snapPoints: (string | number)[];
  initialIndex: number;
  enablePanDownToClose: boolean;
};

type AppBottomSheetContextValue = {
  open: (config: AppBottomSheetConfig) => void;
  close: () => void;
};

const DEFAULT_SNAP_POINTS = ["55%"];
const AppBottomSheetContext = createContext<AppBottomSheetContextValue | null>(null);

function renderBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.42}
      pressBehavior="close"
    />
  );
}

export function AppBottomSheetProvider({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const modalRef = useRef<ElementRef<typeof BottomSheetModal>>(null);
  const activeConfigRef = useRef<ActiveBottomSheetConfig | null>(null);
  const pendingConfigRef = useRef<ActiveBottomSheetConfig | null>(null);
  const hasPresentedRef = useRef(false);
  const isDismissingRef = useRef(false);
  const [activeConfig, setActiveConfig] = useState<ActiveBottomSheetConfig | null>(null);

  const activate = (config: ActiveBottomSheetConfig) => {
    activeConfigRef.current = config;
    setActiveConfig(config);
  };

  const normalizeConfig = (config: AppBottomSheetConfig): ActiveBottomSheetConfig => ({
    ...config,
    snapPoints: config.snapPoints ? [...config.snapPoints] : [...DEFAULT_SNAP_POINTS],
    initialIndex: config.initialIndex ?? 0,
    enablePanDownToClose: config.enablePanDownToClose ?? true,
  });

  const open = (config: AppBottomSheetConfig) => {
    const nextConfig = normalizeConfig(config);
    const currentConfig = activeConfigRef.current;

    if (!currentConfig) {
      activate(nextConfig);
      return;
    }

    if (!hasPresentedRef.current) {
      activeConfigRef.current = null;
      setActiveConfig(null);
      currentConfig.onClose?.();
      if (!activeConfigRef.current) activate(nextConfig);
      return;
    }

    pendingConfigRef.current = nextConfig;
    if (!isDismissingRef.current) {
      isDismissingRef.current = true;
      modalRef.current?.dismiss();
    }
  };

  const close = () => {
    pendingConfigRef.current = null;
    const currentConfig = activeConfigRef.current;
    if (!currentConfig) return;

    if (!hasPresentedRef.current) {
      activeConfigRef.current = null;
      setActiveConfig(null);
      currentConfig.onClose?.();
      return;
    }

    if (!isDismissingRef.current) {
      isDismissingRef.current = true;
      modalRef.current?.dismiss();
    }
  };

  useEffect(() => {
    if (!activeConfig) return;
    modalRef.current?.present();
    hasPresentedRef.current = true;
  }, [activeConfig]);

  const handleDismiss = () => {
    const dismissedConfig = activeConfigRef.current;
    const pendingConfig = pendingConfigRef.current;

    activeConfigRef.current = null;
    pendingConfigRef.current = null;
    hasPresentedRef.current = false;
    isDismissingRef.current = false;
    setActiveConfig(null);
    dismissedConfig?.onClose?.();

    if (!activeConfigRef.current && pendingConfig) activate(pendingConfig);
  };

  return (
    <AppBottomSheetContext.Provider value={{ open, close }}>
      {children}
      <BottomSheetModal
        ref={modalRef}
        index={activeConfig?.initialIndex ?? 0}
        snapPoints={activeConfig?.snapPoints ?? DEFAULT_SNAP_POINTS}
        enableDynamicSizing={false}
        enablePanDownToClose={activeConfig?.enablePanDownToClose ?? true}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}
        keyboardBehavior="interactive"
      >
        <BottomSheetScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom, LayoutScale.lg_24) },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {activeConfig?.title ? <Text style={styles.title}>{activeConfig.title}</Text> : null}
          <View>{activeConfig?.content}</View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </AppBottomSheetContext.Provider>
  );
}

export function AppBottomSheetRoot({ children }: PropsWithChildren) {
  return (
    <BottomSheetModalProvider>
      <AppBottomSheetProvider>{children}</AppBottomSheetProvider>
    </BottomSheetModalProvider>
  );
}

export function useAppBottomSheet() {
  const context = useContext(AppBottomSheetContext);
  if (!context) {
    throw new Error("useAppBottomSheet must be used within an AppBottomSheetProvider.");
  }
  return context;
}

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: PaletteColors.white,
  },
  handleIndicator: {
    width: 36,
    backgroundColor: PaletteColors.appD4D4D4,
  },
  content: {
    paddingHorizontal: LayoutScale.md_16,
    paddingTop: LayoutScale.sm_8,
  },
  title: {
    marginBottom: LayoutScale.md_16,
    color: PaletteColors.app262626,
    fontSize: 18,
    fontWeight: "700",
  },
});