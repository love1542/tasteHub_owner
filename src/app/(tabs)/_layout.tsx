import { Redirect, Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { AppSplash } from "../../components/AppSplash";
import { PaletteColors } from "../../constants/colors";
import { useAuth } from "../../providers/AuthProvider";

export default function TabsLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <AppSplash />;
  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PaletteColors.appPrimary2,
        tabBarInactiveTintColor: PaletteColors.app737373,
        tabBarStyle: {
          height: 62,
          paddingTop: 7,
          paddingBottom: 7,
          borderTopColor: PaletteColors.appD4D4D4,
          backgroundColor: PaletteColors.white,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ color }) => <SymbolView name={{ ios: "house.fill", android: "home", web: "home" }} tintColor={color} size={22} /> }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: "Orders", tabBarIcon: ({ color }) => <SymbolView name={{ ios: "list.bullet.rectangle", android: "receipt_long", web: "receipt_long" }} tintColor={color} size={22} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ color }) => <SymbolView name={{ ios: "person.crop.circle.fill", android: "account_circle", web: "account_circle" }} tintColor={color} size={22} /> }}
      />
    </Tabs>
  );
}