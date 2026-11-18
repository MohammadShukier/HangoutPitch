import { StyleSheet, Text } from "react-native";
import AppScreen from "../../components/AppScreen";
import { colors, sizes } from "../../constants/colors";

// Placeholder: the outings list is built in T3.
export default function HomeScreen() {
  return (
    <AppScreen centered>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.text}>Your outings will show here.</Text>
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
  text: {
    fontSize: sizes.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
  },
});
