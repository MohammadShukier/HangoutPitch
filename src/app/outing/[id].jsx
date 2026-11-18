import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import ResponseSelector from "../../components/ResponseSelector";
import StatusBadge from "../../components/StatusBadge";
import { colors, sizes } from "../../constants/colors";
import { responseOptions, typeIcons } from "../../constants/outingOptions";
import { useAuth } from "../../context/AuthContext";
import { useOutings } from "../../context/OutingsContext";

export default function OutingDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { outings, isLoaded, error, deleteOuting, setMyResponse } = useOutings();

  // Only the id comes through the route; the outing is read from context,
  // so edits show up here right away. Route params are strings → Number().
  const outing = outings.find((o) => o.id === Number(id));

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  }

  function handleEdit() {
    router.push({ pathname: "/outing/form", params: { id: outing.id } });
  }

  // Ask first, because deleting can't be undone.
  function handleDelete() {
    Alert.alert("Delete outing", `Delete "${outing.title}"? This can't be undone.`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: confirmDelete },
    ]);
  }

  function confirmDelete() {
    deleteOuting(outing.id);
    goBack();
  }

  function handleResponseChange(response) {
    setMyResponse(outing.id, user.name, response);
  }

  function getResponseLabel(value) {
    return responseOptions.find((option) => option.value === value).label;
  }

  // This screen is outside the tabs guard, so it checks the user itself.
  if (!user) return <Redirect href="/login" />;

  if (!isLoaded) {
    return (
      <AppScreen centered>
        <ActivityIndicator size="large" color={colors.primary} />
      </AppScreen>
    );
  }

  if (!outing) {
    return (
      <AppScreen centered>
        <Text style={styles.notFoundTitle}>Outing not found</Text>
        <Text style={styles.notFoundText}>It may have been deleted.</Text>
        <AppButton text="Back" onPress={goBack} />
      </AppScreen>
    );
  }

  // The user's own RSVP is the entry with their name (undefined = not answered yet).
  const myResponse = outing.responses.find((r) => r.name === user.name)?.response;
  const cost = outing.estimatedCost === 0 ? "Free" : `$${outing.estimatedCost}`;

  return (
    <AppScreen>
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Ionicons name={typeIcons[outing.type]} size={26} color={colors.primary} />
          <Text style={styles.title}>{outing.title}</Text>
        </View>
        <StatusBadge status={outing.status} />

        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={18} color={colors.muted} />
          <Text style={styles.info}>{outing.type}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color={colors.muted} />
          <Text style={styles.info}>{outing.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color={colors.muted} />
          <Text style={styles.info}>{outing.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={18} color={colors.muted} />
          <Text style={styles.info}>{cost}</Text>
        </View>

        {outing.notes !== "" && <Text style={styles.notes}>{outing.notes}</Text>}
      </View>

      <Text style={styles.sectionTitle}>Your answer</Text>
      <ResponseSelector value={myResponse} onChange={handleResponseChange} />

      <Text style={styles.sectionTitle}>Who&apos;s coming</Text>
      <View style={styles.countsRow}>
        {responseOptions.map((option) => (
          <View key={option.value} style={styles.countBox}>
            <Text style={styles.countNumber}>
              {outing.responses.filter((r) => r.response === option.value).length}
            </Text>
            <Text style={styles.countLabel}>{option.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        {outing.responses.length === 0 && <Text style={styles.info}>No answers yet.</Text>}
        {outing.responses.map((r) => (
          <View key={r.name} style={styles.friendRow}>
            <Text style={styles.friendName}>{r.name === user.name ? "You" : r.name}</Text>
            <Text style={styles.friendResponse}>{getResponseLabel(r.response)}</Text>
          </View>
        ))}
      </View>

      <AppButton text="Edit" variant="secondary" onPress={handleEdit} style={styles.button} />
      <AppButton text="Delete" variant="danger" onPress={handleDelete} style={styles.button} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontSize: sizes.body,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: sizes.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  info: {
    flex: 1,
    fontSize: sizes.body,
    color: colors.text,
    marginLeft: 8,
  },
  notes: {
    fontSize: sizes.body,
    color: colors.muted,
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 16,
    marginBottom: 10,
  },
  countsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  countBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
  },
  countNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
  },
  countLabel: {
    fontSize: 14,
    color: colors.muted,
  },
  friendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  friendName: {
    fontSize: sizes.body,
    color: colors.text,
  },
  friendResponse: {
    fontSize: sizes.body,
    color: colors.muted,
  },
  button: {
    marginTop: 12,
  },
  notFoundTitle: {
    fontSize: sizes.heading,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  notFoundText: {
    fontSize: sizes.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
});
