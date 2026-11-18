import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import { colors, sizes } from "../constants/colors";

export default function WelcomeScreen() {
  function goToLogin() {
    router.push("/login");
  }

  return (
    <AppScreen centered>
      <Ionicons name="people-circle-outline" size={80} color={colors.primary} style={styles.icon} />
      <Text style={styles.title}>HangoutPitch</Text>
      <Text style={styles.pitch}>Pitch outing ideas, see who is in, and lock in the plan.</Text>
      <AppButton text="Get started" onPress={goToLogin} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: sizes.heading,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  pitch: {
    fontSize: sizes.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
  },
});
