import { Stack } from "expo-router";
import { colors } from "../constants/colors";
import AuthProvider from "../context/AuthContext";
import OutingsProvider from "../context/OutingsContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <OutingsProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: "bold" },
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ title: "Log in" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="outing/[id]" options={{ title: "Outing details" }} />
        </Stack>
      </OutingsProvider>
    </AuthProvider>
  );
}
