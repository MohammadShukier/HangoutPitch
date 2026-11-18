import { Stack } from "expo-router";
import { colors } from "../constants/colors";
import AuthProvider from "../context/AuthContext";
import OutingsProvider from "../context/OutingsContext";

export default function RootLayout() {
  // The providers wrap the Stack so every screen can read the user and the outings.
  // Header style is set once here so every screen matches.
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
          {/* The tabs show their own header, so the Stack one is hidden. */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </OutingsProvider>
    </AuthProvider>
  );
}
