import { StyleSheet, Text } from "react-native";
import AppScreen from "../components/AppScreen";
import { colors, sizes } from "../constants/colors";

// Temporary placeholder until the Welcome screen is built (T2).
export default function Index() {
  return (
    <AppScreen centered>
      <Text style={styles.title}>HangoutPitch</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: sizes.heading,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
});
