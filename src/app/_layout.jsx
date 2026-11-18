import { Stack } from "expo-router";
import { colors } from "../constants/colors";
import OutingsProvider from "../context/OutingsContext";

export default function RootLayout() {
  // The provider wraps the Stack so every screen can read the outings.
  // Header style is set once here so every screen matches.
  return (
    <OutingsProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: "HangoutPitch" }} />
      </Stack>
    </OutingsProvider>
  );
}
