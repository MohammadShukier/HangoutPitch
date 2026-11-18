import { router } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import { colors, sizes } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";
import { useOutings } from "../../context/OutingsContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { outings } = useOutings();

  // Ask first, so a mis-tap doesn't log the user out.
  function handleLogout() {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: confirmLogout },
    ]);
  }

  function confirmLogout() {
    logout();
    // replace: the back button must not return into the app.
    router.replace("/login");
  }

  // The tabs guard redirects to login; this just avoids reading user.name on null meanwhile.
  if (!user) return null;

  return (
    <AppScreen>
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>{outings.length}</Text>
          <Text style={styles.statLabel}>{outings.length === 1 ? "outing" : "outings"} in your group</Text>
        </View>
      </View>

      <AppButton text="Log out" variant="danger" onPress={handleLogout} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: sizes.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: sizes.padding,
    marginBottom: 24,
  },
  name: {
    fontSize: sizes.heading,
    fontWeight: "bold",
    color: colors.text,
  },
  email: {
    fontSize: sizes.body,
    color: colors.muted,
    marginTop: 4,
  },
  stat: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 8,
  },
  statLabel: {
    fontSize: sizes.body,
    color: colors.text,
  },
});
